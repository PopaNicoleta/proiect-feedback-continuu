import React, { useState, useEffect, useCallback } from "react";
import { Button, Typography, Container, Box, CssBaseline } from "@mui/material";
import { useParams, useNavigate } from "react-router";
import FallbackActivity from "./FallbackActivity";
import ReactionsHistoryList from "./ReactionsHistoryList";
import * as professorService from "../../services/professorService";
import * as feedbackService from "../../services/feedbackService";
import CurrentActivityDisplayer from "./CurrentActivityDisplayer";
import FutureActivityDisplayer from "./FutureActivityDisplayer";
import ReactionCountDisplayer from "./ReactionCountDisplayer";

const ActivityAnalytics = () => {
    const { activityId } = useParams();

    const [lastTimestamp, setLastTimestamp] = useState(new Date().toISOString());
    const [activity, setActivity] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isOngoingActivity, setIsOngoingActivity] = useState(false);
    const [reactions, setReactions] = useState([]);
    const [showAll, setShowAll] = useState(false);

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo || userInfo.userRole !== "professor") {
            localStorage.clear();
            navigate("/login");
        }
    }, [navigate]);

    useEffect(() => {
        if (!activity) {
            loadActivity();
        }
    }, [])

    useEffect(() => {
        const fetchFeedback = async () => {
            if (!activity || !activity.id) return;

            let extraUrl = "";
            if (!showAll) {
                extraUrl = `&timestamp=${encodeURIComponent(lastTimestamp)}`;
            }

            const response = await feedbackService.fetchActivityFeedback(activity.id, extraUrl);

            if (response.ok) {
                const data = await response.json();
                setReactions(data.feedback);
            }
        };

        fetchFeedback();

        if (!isOngoingActivity) {
            return;
        }

        const interval = setInterval(fetchFeedback, 5000);

        return () => clearInterval(interval);
    }, [isOngoingActivity, activity, lastTimestamp, showAll]);

    const loadActivity = async () => {
        setIsLoading(true);
        const fetchedActivity = await professorService.getActivityItem(activityId);
        setIsLoading(false);
        if (fetchedActivity.professor_id != userInfo.userId) {
            localStorage.clear();
            navigate("/login");
        }
        setActivity(fetchedActivity);
        setIsOngoingActivity(fetchedActivity.start_time <= lastTimestamp && fetchedActivity.end_time >= lastTimestamp ? true : false);
        if (!isOngoingActivity) {
            setShowAll(true);
        }
    }

    const onUpdate = async (updatedActivity) => {
        await professorService.updateActivity(updatedActivity);
        await loadActivity();
    }

    const handleSaveActivity = useCallback(async (activityData) => {
        const updatedActivity = { ...activity, ...activityData };
        await onUpdate(updatedActivity);
    }, [activity, userInfo.userId]);

    const handleEndNow = async () => {
        const updatedActivity = {
            ...activity,
            end_time: new Date().toISOString(),
        };

        await onUpdate(updatedActivity);
        window.location.reload();
    };

    const renderContent = () => {
        if (isLoading) {
            return <FallbackActivity infoString={"Se încarcă datele activității..."} />
        }

        if (!activity) {
            return <FallbackActivity infoString={"Nicio activitate găsită!"} />
        }

        const startTime = new Date(activity.start_time);
        const endTime = new Date(activity.end_time);
        const currentTime = new Date();

        if (currentTime >= startTime && currentTime <= endTime) {
            return (
                <Container>
                    <CssBaseline />
                    <CurrentActivityDisplayer
                        activity={activity}
                        handleEndNow={handleEndNow}
                        startTime={startTime}
                        endTime={endTime}
                    />
                    <ReactionsHistoryList showAll={showAll} reactions={reactions} />
                </Container>
            );
        } else if (currentTime < startTime) {
            return (
                <FutureActivityDisplayer
                    activity={activity}
                    startTime={startTime}
                    onUpdate={onUpdate}
                    handleSaveActivity={handleSaveActivity} />
            );
        } else if (currentTime > endTime) {
            return (
                <Container>
                    <CssBaseline />
                    <ReactionCountDisplayer
                        activity={activity}
                        reactions={reactions}
                        startTime={startTime}
                        endTime={endTime} />
                    <ReactionsHistoryList showAll={true} reactions={reactions} />
                </Container>
            );
        }
    };

    return (
        <Container style={{ marginTop: "50px" }}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h4" gutterBottom>
                    Detalii despre activitate
                </Typography>
                {isOngoingActivity ? (<Button variant="contained" color="primary" onClick={() => setShowAll(prev => !prev)}>
                    {showAll ? "Incarca recente(de la refresh)" : "Incarca toate reactiile"}
                </Button>) : <></>}
                <Button variant="contained" color="primary" onClick={() => navigate("/professor")}>
                    Inapoi la pagina profesorului
                </Button>
            </Box>
            {renderContent()}
        </Container >
    );
};

export default ActivityAnalytics;
