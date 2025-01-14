import { Paper, Typography, Box, Button, Snackbar } from "@mui/material";
import { useState } from "react";

const CurrentActivityDisplayer = ({ activity, handleEndNow, startTime, endTime }) => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    return (
        <Paper elevation={3} style={{ padding: "20px", textAlign: "center" }}>
            <Typography variant="h5" gutterBottom>
                Activitatea este în desfășurare
            </Typography>
            <Typography variant="body1">Titlu: {activity.title}</Typography>
            <Typography variant="body1">
                Inceput: {startTime.toLocaleString()}
            </Typography>
            <Typography variant="body1">
                Finalizare planificata: {endTime.toLocaleString()}
            </Typography>
            <Box display="flex" alignItems="center" justifyContent="space-around">
                <Button variant="contained" color="secondary" onClick={handleEndNow}>
                    Termina acum
                </Button>
                <Button
                    variant="contained"
                    fontSize="0.5rem"
                    color="primary"
                    onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(activity.access_code)
                            .then(() => setOpenSnackbar(true));
                    }}
                >
                    Copiaza cod
                </Button>
            </Box>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={1500}
                onClose={() => setOpenSnackbar(false)}
                message="Codul a fost copiat in clipboard"
            />
        </Paper>
    );
}

export default CurrentActivityDisplayer;