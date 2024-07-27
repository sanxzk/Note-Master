import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  styled,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionIcon from "@mui/icons-material/Description";
import { useDispatch, useSelector } from "react-redux";
import AddUserDetails from "../AddUserDetails/AddUserDetails";
import { logoutUser, openAddUserDetailModal } from "../../store/auth/authSlice";
import { toast } from "react-toastify";
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  flexGrow: 1,
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  justifyContent: "space-between",
}));

const TitleTypography = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
}));

const NavLink = styled(Button)(({ theme }) => ({
  textTransform: "none",
  margin: theme.spacing(0, 1),
}));

export default function Navbar() {
  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { name, email } = useSelector((state) => state.auth);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const openEditUser = () => {
    dispatch(openAddUserDetailModal());
  };
  const dispatchLogoutUser = () => {
    toast.success("Logout Successful");
    setTimeout(() => {
      dispatch(logoutUser());
    }, 1000);
  };

  const drawerContent = (
    <List>
      <ListItem onClick={openEditUser} button>
        <ListItemText primary="Edit User" />
      </ListItem>
      <ListItem onClick={dispatchLogoutUser} button>
        <ListItemText primary="Logout" />
      </ListItem>
      <ListItem button>
        <ListItemText primary={name} />
      </ListItem>
    </List>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar sx={{backgroundColor:'#67339e'}}  position="static">
        <StyledToolbar>
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Box>
          <TitleTypography
            sx={{ display: "flex", alignItems: "center" }}
            variant="h6"
            component="div"
          >
            <DescriptionIcon />  Note Master
          </TitleTypography>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <NavLink onClick={openEditUser} color="inherit">
              Edit User{" "}
            </NavLink>
            |
            <NavLink onClick={dispatchLogoutUser} color="inherit">
              Logout
            </NavLink>
            |<NavLink color="inherit">{name}</NavLink>
          </Box>
        </StyledToolbar>
      </StyledAppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: "250px",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}
