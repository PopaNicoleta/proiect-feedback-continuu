import { Paper, Typography, Box, Button, Container, CssBaseline } from "@mui/material";
import ActivityDialog from "../ActivityDialog";
import { useState, useCallback } from "react";

const FutureActivityDisplayer = ({ activity, startTime, handleSaveActivity }) => {
    const [openDialog, setOpenDialog] = useState(false);

    return (
        <Container>
            <CssBaseline />
            <Paper elevation={3} style={{ padding: "20px", textAlign: "center" }}>
                <Typography variant="h5" gutterBottom>
                    Activitatea nu a început încă
                </Typography>
                <Typography variant="body1">Titlu: {activity.title}</Typography>
                <Typography variant="body1">
                    Va începe la: {startTime.toLocaleString()}
                </Typography>
                <Box mt={2}>
                    <Button variant="contained" color="primary" onClick={() => setOpenDialog((prev) => !prev)}>
                        Editează activitatea
                    </Button>
                </Box>
            </Paper>
            <ActivityDialog
                open={openDialog}
                onClose={() => setOpenDialog((prev) => !prev)}
                activity={activity}
                onSave={handleSaveActivity}
            />
        </Container>

    );
}

export default FutureActivityDisplayer;