import  React, {useState} from "react";
import { styled, Box, Drawer } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { Outlet } from "react-router-dom";
import classes from "./Drawer.module.css";

import HeaderDrawer from "./HeaderDrawer";
import SideDrawer from "./SideDrawer";

const drawerWidth = 250;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
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
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
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

export default function PersistentDrawerLeft() {
  const [open, setOpen] = useState(true);

  const toggleDrawerHandler = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={open} className={classes.test}>
        <HeaderDrawer toggleDrawerHandler={toggleDrawerHandler} />
      </AppBar>
      <Drawer className={classes.side__drawer}
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
        <SideDrawer  />
      </Drawer>
      <Main open={open}>
        <Box mt={12}>
          <Outlet />
        </Box>
      </Main>
    </Box>
  );
}
