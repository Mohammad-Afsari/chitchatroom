import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Button, Paper } from "@mui/material";
import { signOut } from "../../services/auth";
import Profile from "./Profile/Profile";
import Settings from "./Settings/Settings";
import Channels from "./Channels/Channels";
import Chat from "./Chat/Chat";
import { useChannel } from "../../store/useChannel";
import { useLocation, useParams } from "react-router-dom";
import { supabase } from "../../services/supabaseClient";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteChannel from "./Channels/DeleteChannel/DeleteChannel";
import Home from "./Home/Home";
import { useTitle } from "../../store/useTitle";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  marginTop: -9,
  marginBottom: -9,
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
  height: "1%",
}));

const NavbarAuth = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { channelTitle, channelDescription } = useTitle();
  let { roomId } = useParams();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ display: "flex" }} variant="dense">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ width: "95%" }}>
            {channelTitle && channelTitle}
            {/* {channelDescription ? " ~ " : ""}
            <span style={{ fontSize: "12px" }}>
              {channelDescription && channelDescription}
            </span> */}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              width: "5%",
              justifyContent: "flex-end",
              display: "flex",
            }}
            component="span"
          >
            {roomId && <DeleteChannel />}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <Profile />
        </List>
        <Typography component="div" sx={{ width: "90%", margin: "0 auto" }}>
          <Divider />
        </Typography>
        <List>
          <Settings />{" "}
        </List>
        <Typography component="div" sx={{ width: "90%", margin: "0 auto" }}>
          <Divider />
        </Typography>
        <List>
          <Channels />
        </List>
      </Drawer>

      <Main open={open}>
        <DrawerHeader />
        {/* Put in chatrooms intro into the app */}
        {roomId && <Chat />}
        {!roomId && <Home />}
      </Main>
    </Box>
  );
};

export default NavbarAuth;
