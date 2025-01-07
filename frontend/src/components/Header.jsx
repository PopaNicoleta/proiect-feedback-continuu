import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router";

const Header = ({ userEmail, userRole }) => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate("/login");
    }

    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography
                    variant="h6"
                    sx={{
                        flexGrow: 1,
                        color: "text.primary", 
                    }}
                >
                    Bună, {userEmail}! ({userRole})
                </Typography>

                <Button
                    onClick={logout}
                    variant="contained"
                >
                    Delogare
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
