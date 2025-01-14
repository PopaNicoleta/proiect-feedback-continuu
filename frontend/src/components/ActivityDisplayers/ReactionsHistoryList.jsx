import { Paper, Typography, List, ListItem, ListItemText } from "@mui/material";
import * as constants from "../../constants/constants";
import * as professorService from "../../services/professorService";

const ReactionsHistoryList = ({showAll, reactions}) => {
    return (
        <Paper elevation={3} style={{ marginTop: "20px", padding: "20px" }}>
            <Typography variant="h6" gutterBottom>
                Istoric reactii
            </Typography>
            <List>
                {reactions.length > 0 ? (
                    reactions.map((reaction, index) => (
                        <ListItem key={index}>
                            <img
                                src={constants.emojiToImg[reaction.emoji]}
                                alt={reaction.emoji}
                                style={{ width: 30, height: 30, marginRight: 20 }}
                            />
                            <ListItemText
                                primary={professorService.formatISOString(reaction.timestamp)}
                            />
                        </ListItem>
                    ))
                ) : (
                    <Typography variant="body2" color="textSecondary">
                        {showAll ? "Nu sunt reacții pentru această activitate." : "Nu aveti reactii recente."}
                    </Typography>
                )}
            </List>
        </Paper>
    );
}

export default ReactionsHistoryList;