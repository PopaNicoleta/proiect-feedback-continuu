import React, { useState, useEffect } from "react";
import { CssBaseline, Container, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useNavigate } from 'react-router';
import Header from './Header';
import { joinActivity } from "../services/studentService";

const Student = () => {
    const [dialogMessage, setDialogMessage] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [activityCode, setActivityCode] = useState("");

    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    useEffect(() => {
        if (!userInfo || userInfo.userRole !== "student") {
            localStorage.clear();
            navigate("/login");
        }
    }, [navigate]);

    const handleJoin = async () => {
        const response = await joinActivity(activityCode);
        if (response.status === 425) {
            setDialogMessage("Activitatea nu este in desfasurare.");
            setDialogOpen(true);
        } else if (response.status === 404) {
            setDialogMessage("Activitatea nu a fost gasita.");
            setDialogOpen(true);
        } else if (response.ok) {
            const data = await response.json();
            const activityId = data.activityId;
            navigate(`/activity/${activityId}`);
        }
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    return userInfo ? (
        <>
            <CssBaseline />
            <Header userEmail={userInfo.userEmail} userRole="Student" />
            <Container style={{ textAlign: 'center', marginTop: '200px' }}>
                <Typography variant="h5">Conectare activitate</Typography>
                <TextField
                    label="Cod activitate"
                    variant="outlined"
                    value={activityCode}
                    onChange={(e) => setActivityCode(e.target.value)}
                    style={{ margin: '20px 0', width: '300px' }}
                />
                <br />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleJoin}
                >
                    Join
                </Button>

                <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                    <DialogTitle>Notificare</DialogTitle>
                    <DialogContent>
                        <p>{dialogMessage}</p>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary">
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </>
    ) : (<></>);
};

export default Student;