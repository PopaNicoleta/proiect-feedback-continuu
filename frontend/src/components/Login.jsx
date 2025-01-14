import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import { login } from "../services/loginService";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const emailFromQuery = new URLSearchParams(location.search).get("email");
    const [formData, setFormData] = useState({ email: emailFromQuery || "", password: "" });

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo && userInfo.isLogged) {
            navigate(`/${userInfo.userRole}`);
        }
    }, [navigate]);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await login(formData);

        if(response.ok) {
            const result = await response.json();
            localStorage.setItem("userInfo", JSON.stringify({
                userId: result.id,
                isLogged: true,
                userEmail: result.email,
                userRole: result.role
            }));
            if(result.role === "professor") {
                navigate("/professor");
            }
            else {
                navigate("/student");
            }
        } 
        else {
            alert("Wrong credentials!");
        }
    };

    return (
        <>
            <CssBaseline />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                    height: "100vh",
                    overflow: "hidden",
                    bgcolor: "background.default",
                    color: "text.primary",
                    margin: 0,
                    padding: 0,
                }}
            >
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        width: "100%",
                        maxWidth: 400,
                        p: 3,
                        borderRadius: 2,
                        bgcolor: "background.paper",
                        boxShadow: 3,
                    }}
                >
                    <Typography
                        variant="h5"
                        align="center"
                        gutterBottom
                        sx={{ fontWeight: "bold", color: "text.secondary" }}
                    >
                        Login
                    </Typography>
                    <TextField
                        label="Email"
                        type="email"
                        variant="outlined"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ fontWeight: "bold" }}
                    >
                        Login
                    </Button>
                    <Typography
                        align="center"
                        sx={{ cursor: "pointer", color: "secondary.main", mt: 2 }}
                        onClick={() => navigate("/register")}
                    >
                        Don't have an account? Create one
                    </Typography>
                </Box>
            </Box>
        </>
    );
};

export default Login;