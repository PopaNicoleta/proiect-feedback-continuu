import React, { useState } from 'react';
import { CssBaseline, TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import Header from './Header';

const Student = () => {
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    useEffect(() => {
        if (!userInfo || userInfo.userRole !== "student") {
            localStorage.clear();
            navigate("/login");
        }
    }, [navigate]);

    const [activityCode, setActivityCode] = useState("");

    const handleJoin = async () => {
        if (activityCode !== "") {
            const response = await fetch(`http://localhost:8080/api/v1/activities/join`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({activityCode}),
            });
            if(response.ok) {
                const data = await response.json();
                const activityId = data.activityId;
                console.log(activityId);
                navigate(`/activity/${activityId}`);
            }
        }
    };

    return (
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
            </Container>
        </>
    );
};

export default Student;