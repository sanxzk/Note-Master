import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addDetails } from "../../store/auth/authSlice";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%", // Adjust width for different screen sizes
  maxWidth: 400, // Maximum width for larger screens
  bgcolor: "background.paper",
  borderRadius: "1rem",
  border: "1px solid rgba(0,0,0,0.25)",
  boxShadow: 12,
  p: 4,
};

export default function AddUserDetails() {
  const { name, email } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: name ? name : "",
    email: email ? email : "",
  });

  const handleClose = () => setOpen(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim() === "" || formData.email.trim() === "") {
      toast.warn("Please Enter the Details");
      return;
    }
    // Handle form submission logic here
    dispatch(addDetails(formData));
    toast.success("Details added successfully");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleSubmit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              <Typography
                
                variant="h5"
                align="center"
              >
                Welcome to PlannerPulse
              </Typography>
              <Typography color="secondary" variant="h6" align="center">
                Add User Details
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="email">Email address</InputLabel>
                      <Input
                        id="email"
                        aria-describedby="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      <FormHelperText id="email">
                        We'll never share your email.
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="name">Name</InputLabel>
                      <Input
                        id="name"
                        aria-describedby="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      <FormHelperText id="name">Your full name.</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid sx={{ margin: "auto" }} item xs={6}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{backgroundColor:' #67339e'}}
                      fullWidth
                    >
                      Submit
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
}
