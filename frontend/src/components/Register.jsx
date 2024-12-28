import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate } from "react-router";

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#F29F58", // Primary color for buttons and highlights
        },
        secondary: {
            main: "#AB4459", // Secondary color for accents
        },
        background: {
            default: "#1B1833", // Outer background
            paper: "#441752", // Form background
        },
        text: {
            primary: "#F3E5F5", // Light text for readability
            secondary: "#F29F58", // Highlighted text
        },
    },
    typography: {
        fontFamily: "'Roboto', 'Arial', sans-serif",
    },
});


const Register = () => {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        role: "",
    });

    const [statusMessage, setStatusMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Submitted Data:", formData);

        try {
            const response = await fetch("http://localhost:8080/api/v1/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            console.log(response);

            if (response.ok) {
                const result = await response.json();
                setStatusMessage(`Success: ${result.message} Email: ${result.email}`);
                navigate(`/login?email=${encodeURIComponent(result.email)}`);
            } else if (response.status === 409) {
                setStatusMessage("Error: Email already exists. Please try a different email.");
                alert(statusMessage);
            } else if (response.status === 500) {
                setStatusMessage("Error: Registration failed. Please try again later.");
            } else {
                setStatusMessage("Unexpected error. Please try again.");
            }
        } catch (error) {
            setStatusMessage("Error: Could not connect to the server. Please check your network.");
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline /> {/* Reset default browser styles */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                    height: "100vh", // Prevent scrolling
                    overflow: "hidden", // Disable scrollbars
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
                        border: "none", // Remove borders if any
                    }}
                >
                    <Typography
                        variant="h5"
                        align="center"
                        gutterBottom
                        sx={{ fontWeight: "bold", color: "text.secondary" }}
                    >
                        Register
                    </Typography>
                    <TextField
                        label="First Name"
                        variant="outlined"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                    <TextField
                        label="Last Name"
                        variant="outlined"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
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
                    <TextField
                        label="Role"
                        variant="outlined"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        select
                        required
                        fullWidth
                    >
                        <MenuItem value="professor">Professor</MenuItem>
                        <MenuItem value="student">Student</MenuItem>
                    </TextField>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ fontWeight: "bold" }}
                    >
                        Register
                    </Button>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default Register;
