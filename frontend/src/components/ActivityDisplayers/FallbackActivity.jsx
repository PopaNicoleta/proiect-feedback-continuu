//componenta randata in caz ca nu e gasita activitatea sau inca se incarca
import { CssBaseline, Container, Typography } from "@mui/material";

const FallbackActivity = ({infoString}) => {
    return (
        <>
            <CssBaseline />
            <Container style={{ marginTop: "50px", textAlign: "center" }}>
                <Typography variant="h5" gutterBottom>
                    {infoString}
                </Typography>
            </Container>
        </>
    );
}

export default FallbackActivity;