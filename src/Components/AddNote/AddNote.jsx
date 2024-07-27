import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  styled,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { dispatchAddNote } from "../../store/todo/todoSlice";
import { toast } from "react-toastify";

// Custom styled components to customize outline color
const RedOutlinedInput = styled("input")({
  border: "1px solid red",
  padding: "10px", // adjust padding as needed
  borderRadius: "4px", // adjust border radius as needed
});

const AddNote = () => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSave = () => {
    if (title && description) {
      // Generate unique ID using timestamp
      const timestamp = new Date().getTime();
      const newNote = {
        id: `note_${timestamp}`, // Unique ID based on timestamp
        title,
        description,
      };
      dispatch(dispatchAddNote(newNote));
      toast.success("Note added");
      // Clear form
      setTitle("");
      setDescription("");
    }
  };

  // Function to get today's date in yyyy-mm-dd format
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  };

  return (
    <Box sx={{ p: 2, maxWidth: 800, margin: "0.5rem 0", mx: "auto" }}>
    <Typography sx={{margin:"1rem 0rem"}} color="secondary"  variant="h5">Add a new Note</Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={4}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            size="small"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            InputProps={{
              inputComponent: RedOutlinedInput, // Using custom styled input component
            }}
            InputLabelProps={{
              shrink: true,
              classes: {
                root: "red-outline", // Adding a class to root element for custom styles
              },
              className: "red-label", // Adding a class name for custom label styles
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            size="small"
            value={description}
            onChange={handleDescriptionChange}
            InputProps={{
              inputComponent: RedOutlinedInput, // Using custom styled input component
            }}
            InputLabelProps={{
              shrink: true,
              classes: {
                root: "red-outline", // Adding a class to root element for custom styles
              },
              className: "red-label", // Adding a class name for custom label styles
            }}
          />
        </Grid>
        <Grid sx={{ margin: "auto" }} item xs={6} sm={2}>
          <Button
          onClick={handleSave}
            type="submit"
            variant="contained"
            sx={{ backgroundColor: " #67339e" }}
            fullWidth
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddNote;
