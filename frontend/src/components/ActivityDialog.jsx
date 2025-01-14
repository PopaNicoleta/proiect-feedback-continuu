import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
import { validateActivity } from "../services/professorService";

const ActivityDialog = ({ open, onClose, activity, onSave }) => {
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const isValidDate = (date) => {
      return date && !isNaN(new Date(date).getTime());
    };
  
    const startDate = activity && isValidDate(activity.start_time)
      ? new Date(activity.start_time).toISOString().slice(0, 16)
      : "";
  
    const endDate = activity && isValidDate(activity.end_time)
      ? new Date(activity.end_time).toISOString().slice(0, 16)
      : "";
    setFormValues({
      title: activity?.title || "",
      description: activity?.description || "",
      start_time: startDate,
      end_time: endDate,
    });
  }, [activity]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (validateActivity(formValues, setErrors)) {
      onSave(formValues);
      setFormValues({
        title: "",
        description: "",
        start_time: "",
        end_time: "",
      });
      onClose();
    }
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
          error={!!errors.title}
          helperText={errors.title}
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
          error={!!errors.start_time}
          helperText={errors.start_time}
          slotProps={{
            inputLabel: {shrink: true}
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
          error={!!errors.end_time}
          helperText={errors.end_time}
          slotProps={{
            inputLabel: {shrink: true}
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
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