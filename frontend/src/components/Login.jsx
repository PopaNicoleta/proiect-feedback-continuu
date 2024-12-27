import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#F29F58", // Primary color
        },
        secondary: {
            main: "#AB4459", // Secondary color
        },
        background: {
            default: "#1B1833", // Outer background
            paper: "#441752", // Form background
        },
        text: {
            primary: "#F3E5F5",
            secondary: "#F29F58",
        },
    },
    typography: {
        fontFamily: "'Roboto', 'Arial', sans-serif",
    },
});

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Login Data:", formData);
        // Add logic to verify login
        const loginInfo = {
            userId: 1,
            role: "student"
        }//call catre backend
        localStorage.setItem("userInfo", JSON.stringify({
            isLogged: true,
            userId: loginInfo.userId
        }));
        if(loginInfo.role === "professor") {//TODO: change this
            navigate("/professor");
        }
        else {
            navigate("/student");
        }
    };

    return (
        <ThemeProvider theme={theme}>
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
        </ThemeProvider>
    );
};

export default Login;
