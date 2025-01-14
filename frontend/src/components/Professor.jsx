import React, { useCallback, useEffect, useState } from 'react';
import { CssBaseline, Container, Typography, Button, List, Paper, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router';
import Header from './Header';
import ActivityDialog from './ActivityDialog';
import * as professorService from '../services/professorService';
import ActivityItem from './ActivityDisplayers/ActivityItem';

const Professor = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [currentActivity, setCurrentActivity] = useState(null);
    const [activities, setActivities] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const handleSaveActivity = useCallback(async (activityData) => {
        if (currentActivity) {
            const updatedActivity = { ...currentActivity, ...activityData };
            professorService.updateActivity(updatedActivity);
        } else {
            const accessCode = professorService.generateCode();
            await professorService.createActivity(activityData, userInfo.userId, accessCode);
        }   
        setCurrentActivity(null);
        await fetchActivities();
    }, [currentActivity, userInfo.userId]);

    const handleDeleteActivity = useCallback(async (activity) => {
        if (window.confirm(`Ești sigur că vrei să ștergi activitatea "${activity.title}"?`)) {
            await professorService.deleteActivity(activity.id);
            await fetchActivities();
        }
    }, []);

    const handleActivityClick = (activity) => {
        navigate(`/analytics/${activity.id}`);
    }

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
        const newActivities = await professorService.getActivityList(userInfo.userEmail);
        setActivities(newActivities);
    }

    const handleDialogToggle = (activity = null) => {
        setCurrentActivity(activity);
        setOpenDialog((prev) => !prev);
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
                            <ActivityItem
                                activity={activity}
                                key={activity.id}
                                handleActivityClick={handleActivityClick}
                                handleDialogToggle={handleDialogToggle}
                                setCurrentActivity={setCurrentActivity}
                                handleDeleteActivity={handleDeleteActivity}
                                setOpenSnackbar={setOpenSnackbar} />
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
            <Snackbar
                open={openSnackbar}
                autoHideDuration={1500}
                onClose={() => setOpenSnackbar(false)}
                message="Codul a fost copiat in clipboard"
            />
        </>
    );

};

export default Professor;