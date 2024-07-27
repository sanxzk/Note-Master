import React from "react";
import { useSelector } from "react-redux";
import AddUserDetails from "../../Components/AddUserDetails/AddUserDetails";
import Navbar from "../../Components/Navbar/Navbar";
import MainContent from "../../Components/MainContent/MainContent";
import Footer from "../../Components/Footer/Footer";
import { Grid, Box, Divider } from "@mui/material";
import AddNote from "../../Components/AddNote/AddNote";

const Home = () => {
  const { openModal } = useSelector((state) => state.auth);

  if (openModal) {
    return <AddUserDetails />;
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ position: 'sticky', top: 0, zIndex: 1 }}>
        <Navbar />
      </Box>
      <Box>
        <AddNote />
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ flexGrow: 1 }}>
        <MainContent />
      </Box>
      <Box sx={{ position: 'sticky', bottom: 0, zIndex: 1 }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default Home;
