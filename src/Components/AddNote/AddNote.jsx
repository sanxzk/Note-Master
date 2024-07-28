import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  Modal,
  IconButton,
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { dispatchAddNote } from "../../store/todo/todoSlice";
import { toast } from "react-toastify";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: 400,
  bgcolor: "background.paper",
  borderRadius: "1rem",
  border: "1px solid rgba(0,0,0,0.25)",
  boxShadow: 12,
  p: 4,
};

const AddNote = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "title") setTitle(value);
    else if (id === "description") setDescription(value);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (title.trim() === "" || description.trim() === "") {
      toast.warn("Please enter all details");
      return;
    }
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
    handleClose();
  };

  return (
    <div>
      <IconButton color="primary" onClick={handleOpen}>
        <AddIcon style={{ color: "#67339e" }} />
        <Typography sx={{ color: '#67339e', marginLeft: 1 }} variant="h6">
          Add Note
        </Typography>
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={12}>
              <Typography variant="h5" align="center">
                Add a New Note
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <form onSubmit={handleSave}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="title">Title</InputLabel>
                      <Input
                        id="title"
                        aria-describedby="title"
                        value={title}
                        onChange={handleChange}
                      />
                      <FormHelperText id="title">
                        Enter the note title.
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                  <FormControl fullWidth>
                  <TextField
                    id="description"
                    label="Description"
                    aria-describedby="description"
                    value={description}
                    onChange={handleChange}
                    multiline
                    minRows={4}
                    maxRows={6}
                    variant="outlined"
                  />
                  <FormHelperText id="description">
                    Enter the note description.
                  </FormHelperText>
                </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ backgroundColor: "#67339e" }}
                      fullWidth
                    >
                      Submit
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={handleClose}
                      fullWidth
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default AddNote;
