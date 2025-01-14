import { Paper, Typography, Box } from "@mui/material";

const ReactionCountDisplayer = ({ activity, startTime, endTime, reactions }) => {
    const reactionCounts = reactions.reduce((accumulator, reaction) => {
        accumulator[reaction.emoji] = (accumulator[reaction.emoji] || 0) + 1;
        return accumulator;
    }, {});

    return (
        <Paper elevation={3} style={{ padding: "20px", textAlign: "center" }}>
            <Typography variant="h5" gutterBottom>
                Activitatea s-a încheiat
            </Typography>
            <Typography variant="body1">Titlu: {activity.title}</Typography>
            <Typography variant="body1">
                Început: {startTime.toLocaleString()}
            </Typography>
            <Typography variant="body1">
                Finalizat: {endTime.toLocaleString()}
            </Typography>
            <Box mt={2}>
                <Typography variant="h6" gutterBottom>
                    Total reactii: {reactions.length}, dintre care:
                </Typography>
                {["smiley", "frowny", "surprised", "confused"].map((emoji) => (
                    <Typography key={emoji} variant="body1" mb={1}>
                        {reactionCounts[emoji] || 0} {reactionCounts[emoji] === 1 ? "reactie" : "reactii"} {emoji}
                    </Typography>
                ))}
            </Box>
        </Paper>
    );
}

export default ReactionCountDisplayer;