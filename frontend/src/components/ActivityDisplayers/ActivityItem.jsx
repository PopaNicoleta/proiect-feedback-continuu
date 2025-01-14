import { ListItem, ListItemText, Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import * as professorService from "../../services/professorService";

const ActivityItem = ({activity, handleActivityClick, setCurrentActivity, handleDialogToggle, handleDeleteActivity, setOpenSnackbar}) => {
    return (
        <ListItem
            onClick={() => { handleActivityClick(activity) }}
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
                    secondary={professorService.showTime(activity.start_time, activity.end_time)}
                    slotProps={{
                        primary: {
                            fontWeight: 'bold',
                        }
                    }}
                />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 2 }}>
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
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
                <IconButton
                    edge="end"
                    color="primary"
                    aria-label="edit"
                    sx={{ marginRight: '6px' }}
                    onClick={(e) => {
                        e.stopPropagation();
                        setCurrentActivity(activity);
                        handleDialogToggle(activity);
                    }}
                >
                    <EditIcon />
                </IconButton>
                <IconButton
                    edge="end"
                    color="secondary"
                    aria-label="delete"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteActivity(activity);
                    }}
                >
                    <DeleteIcon />
                </IconButton>
            </div>
        </ListItem >
    );
}

export default ActivityItem;