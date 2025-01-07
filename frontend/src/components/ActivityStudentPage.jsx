import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CssBaseline, Container, Typography, Button, Grid2, Paper, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import smiley from '../assets/smiley.png';
import frowny from '../assets/frowny.png';
import surprised from '../assets/surprised.png';
import confused from '../assets/confused.png';

const ActivityStudentPage = () => {
    const { id } = useParams();
    const [activity, setActivity] = useState(null);
    const [selectedEmoji, setSelectedEmoji] = useState(null);
    const [open, setOpen] = useState(false);
    const [submitMessages, setSubmitMessages] = useState(["", ""]);
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (!userInfo || userInfo.userRole !== "student") {
            localStorage.clear();
            navigate("/login");
        }
    }, [navigate]);

    useEffect(() => {
        const fetchActivity = async () => {
            const response = await fetch(`http://localhost:8080/api/v1/activities?id=${id}`);
            const data = await response.json();
            setActivity(data.activities[0]);
        };
        fetchActivity();
    }, [id]);

    const emojis = [
        { id: 1, img: smiley, label: 'smiley' },
        { id: 2, img: frowny, label: 'frowny' },
        { id: 3, img: surprised, label: 'surprised' },
        { id: 4, img: confused, label: 'confused' },
    ];

    const handleEmojiClick = (id) => {
        setSelectedEmoji(selectedEmoji === id ? null : id);
    };

    const handleSubmit = async () => {
        if (selectedEmoji) {
            const emojiToSubmit = emojis.at(selectedEmoji - 1);

            const feedbackData = [{
                activity_id: id,
                emoji: emojiToSubmit.label,
                timestamp: new Date().toISOString(),
            }];

            const response = await fetch('http://localhost:8080/api/v1/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(feedbackData),
            });

            if (response.ok) {
                setSubmitMessages(["Feedback-ul a fost trimis cu succes", "Multumim pentru feedback!"]);
            }
            else {
                setSubmitMessages(["A aparut o problema", "Feedback-ul nu a fost trimis."]);
            }
            setSelectedEmoji(null);
        }
        else {
            setSubmitMessages(["Atentie la neatentie!", "Selectati un emoji inainte sa apasati submit!"])
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleBackClick = () => {
        navigate('/student');
    };

    return (
        <Container style={{ marginTop: '50px', textAlign: 'center' }}>
            <CssBaseline />
            <Typography variant="h5" style={{ marginBottom: '20px' }}>
                {activity ? `Activitate: ${activity.title}` : "Incarcare activitate..."}
            </Typography>
            <Typography variant="h6" style={{ marginBottom: '20px' }}>
                Apăsați pe un emoticon pentru a trimite o reacție live
            </Typography>
            <Paper
                elevation={3}
                style={{
                    width: '80%',
                    margin: '0 auto',
                    padding: '20px',
                    borderRadius: '20px',
                }}
            >
                <Grid2 container spacing={2} style={{ height: '400px' }}>
                    {emojis.map((emoji) => (
                        <Grid2
                            onClick={() => handleEmojiClick(emoji.id)}
                            size={6}
                            key={emoji.id}
                            style={{
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: selectedEmoji === emoji.id ? '2px solid blue' : '1px solid #ccc',
                            }}
                        >
                            <Button
                                style={{
                                    padding: '0',
                                    backgroundColor: 'transparent',
                                }}
                                disableRipple
                            >
                                <img
                                    src={emoji.img}
                                    alt={emoji.label}
                                    style={{
                                        width: '120px', height: '120px', pointerEvents: 'none'
                                    }}
                                />
                            </Button>
                        </Grid2>
                    ))}
                </Grid2>
            </Paper>
            <Button
                variant="contained"
                color="primary"
                style={{ marginTop: '20px' }}
                onClick={handleSubmit}
            >
                Submit
            </Button>
            <Button
                variant="outlined"
                color="secondary"
                style={{ marginTop: '20px', marginLeft: '10px' }}
                onClick={handleBackClick}
            >
                Inapoi la pagina studentului
            </Button>

            {/* Modal for successful submission */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{submitMessages[0]}</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        {submitMessages[1]}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default ActivityStudentPage;
