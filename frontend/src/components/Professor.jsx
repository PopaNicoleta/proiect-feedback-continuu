import React, { useCallback } from 'react';
import { CssBaseline, Container, Typography, Button, List, ListItem, ListItemText, Paper, IconButton } from '@mui/material';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import Header from './Header';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ActivityDialog from './ActivityDialog';

//lucius@gmail.com
//PassPau@03

const generateCode = (length = 8) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}

const Professor = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [currentActivity, setCurrentActivity] = useState(null);
    const [activities, setActivities] = useState([]);

    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const handleSaveActivity = useCallback(async (activityData) => {
        if (currentActivity) {
            const updatedActivity = { ...currentActivity, ...activityData };
            await fetch("http://localhost:8080/api/v1/activities", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedActivity),
            });
        } else {
            console.log("Adding new activity:", activityData);
            const accessCode = generateCode();
            await fetch("http://localhost:8080/api/v1/activities", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify([{ ...activityData, professor_id: userInfo.userId, access_code: accessCode }]),
            });
        }
        await fetchActivities();
    }, [currentActivity, userInfo.userId]);

    const handleDeleteActivity = useCallback(async (activity) => {
        if (window.confirm(`Ești sigur că vrei să ștergi activitatea "${activity.title}"?`)) {
            const result = await fetch(`http://localhost:8080/api/v1/activities?id=${activity.id}`, {
                method: "DELETE"
            });
            console.log(result);
            await fetchActivities();
        }
    }, []);

    useEffect(() => {
        if (!userInfo || userInfo.userRole !== "professor") {
            localStorage.clear();
            navigate("/login");
        }
    }, [navigate]);

    useEffect(() => {
        fetchActivities();
    }, []);

    const fetchActivities = async () => {
        const result = await fetch(`http://localhost:8080/api/v1/activities?email=${userInfo.userEmail}`, {
            method: "GET"
        });
        const data = await result.json();
        setActivities(data.activities);
    }

    const handleDialogToggle = (activity = null) => {
        setCurrentActivity(activity);
        setOpenDialog((prev) => !prev);
    };

    const handleEditActivity = (activity) => {
        setCurrentActivity(activity);
        handleDialogToggle(activity);
    }

    const showTime = (startTime, endTime) => {
        const start = new Date(startTime);
        const end = new Date(endTime);

        const formatDate = (date) => {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${day}/${month}/${year} ${hours}:${minutes}`;
        };

        if (
            start.getDate() === end.getDate() &&
            start.getMonth() === end.getMonth() &&
            start.getFullYear() === end.getFullYear()
        ) {
            //daca sunt in aceeasi zi
            const datePart = formatDate(start).split(' ')[0];
            const startTimePart = formatDate(start).split(' ')[1];
            const endTimePart = formatDate(end).split(' ')[1];
            return `${datePart} ${startTimePart}-${endTimePart}`;
        } else {
            //daca sunt in zile diferite
            return `${formatDate(start)} - ${formatDate(end)}`;
        }
    };

    return (
        <>
            <CssBaseline />
            <Header userEmail={userInfo.userEmail} userRole="Profesor" />
            <Container style={{ marginTop: '50px' }}>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginBottom: '20px' }}
                    onClick={() => { handleDialogToggle() }}
                >
                    Adaugă activitate nouă
                </Button>

                <Typography variant="h5" style={{ marginBottom: '20px' }}>
                    Activități planificate
                </Typography>

                <Paper
                    elevation={3}
                    style={{
                        padding: '20px',
                        backgroundColor: '#441752',
                        color: '#F3E5F5',
                    }}
                >
                    <List>
                        {activities.length > 0 ? activities.map((activity) => (
                            <ListItem
                                key={activity.id}
                                component="div"
                                style={{
                                    transition: 'background-color 0.3s ease',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: '#AB4459',
                                        color: '#FFFFFF',
                                    },
                                }}
                            >
                                <div style={{ flex: 1 }}>
                                    <ListItemText
                                        primary={activity.title}
                                        secondary={showTime(activity.start_time, activity.end_time)}
                                        slotProps={{
                                            primary: {
                                                fontWeight: 'bold',
                                            }
                                        }}
                                    />
                                </div>

                                <ListItemText
                                    primary={activity.access_code}
                                    secondary="Cod activitate"
                                    slotProps={{
                                        primary: {
                                            fontWeight: 'bold',
                                            textAlign: 'center'
                                        },
                                        secondary: {
                                            fontSize: '0.9rem',
                                            color: '#FFA500',
                                            textAlign: 'center'
                                        }
                                    }}
                                />

                                <IconButton
                                    edge="end"
                                    color="primary"
                                    aria-label="edit"
                                    sx={{ marginRight: '6px' }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleEditActivity(activity);
                                    }}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    edge="end"
                                    color="secondary"
                                    aria-label="delete"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Evită declanșarea `onClick` pe `ListItem`
                                        handleDeleteActivity(activity);
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>
                        )) : (
                            <p>Nu aveti activitati viitoare.</p>
                        )}
                    </List>
                </Paper>
            </Container>
            <ActivityDialog
                open={openDialog}
                onClose={handleDialogToggle}
                activity={currentActivity}
                onSave={handleSaveActivity}
            />
        </>
    );

};

export default Professor;