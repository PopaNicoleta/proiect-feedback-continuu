import { Paper, Typography, List, ListItem, ListItemText, useTheme } from "@mui/material";
import { Pie } from "react-chartjs-2";
import * as constants from "../../constants/constants";
import * as professorService from "../../services/professorService";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ReactionsHistoryList = ({ showAll, reactions }) => {
    const theme = useTheme();

    const reactionCounts = reactions.reduce((acc, reaction) => {
        acc[reaction.emoji] = (acc[reaction.emoji] || 0) + 1;
        return acc;
    }, {});

    const data = {
        labels: Object.keys(reactionCounts).map(emoji => constants.emojiToName[emoji]),
        datasets: [
            {
                data: Object.values(reactionCounts),
                backgroundColor: theme.palette.chart.colors,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    usePointStyle: true,
                    font: {
                        size: 14,
                    },
                    padding: 20,
                },
            },
        },
        maintainAspectRatio: false,
        cutout: '50%',
        radius: '90%',
        spacing: 10,
        borderRadius: 5,
    };

    return (
        <Paper elevation={3} style={{ marginTop: "20px", padding: "20px" }}>
            {showAll && (
                <>
                    <Typography variant="h6" gutterBottom style={{ textAlign: "center" }}>
                        Statistici
                    </Typography>
                    <div style={{ height: "400px", width: "400px", margin: "0 auto" }}>
                        <Pie data={data} options={options} />
                    </div>
                </>
            )}

            <Typography variant="h6" gutterBottom style={{ textAlign: "center" }}>
                Istoric reacții
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
                        {showAll ? "Nu sunt reacții pentru această activitate." : "Nu aveți reacții recente."}
                    </Typography>
                )}
            </List>
        </Paper>
    );

}

export default ReactionsHistoryList;