import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

//TODO: ask try de ce crapa pe ESC

const ActivityDialog = ({ open, onClose, activity, onSave }) => {
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    const startDate = activity? new Date(activity.start_time).toISOString().slice(0, 16) : "";
    const endDate = activity? new Date(activity.end_time).toISOString().slice(0, 16) : "";
    setFormValues({
      title: activity?.title || "",
      description: activity?.description || "",
      start_time: startDate,
      end_time: endDate
    })
  }, [activity])

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(formValues);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{activity ? "Editează activitate" : "Adaugă activitate"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="title"
          label="Title"
          fullWidth
          variant="outlined"
          value={formValues.title}
          onChange={handleChange}
          required
        />
        <TextField
          margin="dense"
          name="description"
          label="Descriere"
          fullWidth
          variant="outlined"
          multiline
          rows={3}
          value={formValues.description}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="start_time"
          label="Ora de început"
          type="datetime-local"
          fullWidth
          variant="outlined"
          value={formValues.start_time}
          onChange={handleChange}
          required
          slotProps={{
            inputLabel: { shrink: true }
          }}
        />
        <TextField
          margin="dense"
          name="end_time"
          label="Ora de sfârșit"
          type="datetime-local"
          fullWidth
          variant="outlined"
          value={formValues.end_time}
          onChange={handleChange}
          required
          slotProps={{
            inputLabel: { shrink: true }
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {onClose()}} color="primary">
          Închide
        </Button>
        <Button onClick={handleSave} color="primary">
          Salvează
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActivityDialog;