import React, { Fragment } from "react";
import classes from "./SideDrawer.module.css";
import { List, styled } from "@mui/material";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import AddchartIcon from '@mui/icons-material/Addchart';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import DrawerLink from "./DrawerLink";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const SideDrawer = () => {
  return (
    <Fragment>
      <DrawerHeader className={classes.drawer}>
        <h2 className={classes.drawer__title}>Antwerp</h2>
      </DrawerHeader>
      <List className={classes.drawer__list}>
        <DrawerLink link="/dashboard" title="Stats" icon={<InsertChartOutlinedIcon fontSize="large"/>}/>
        <DrawerLink link="/profile" title="Profile" icon={<AccountBoxOutlinedIcon fontSize="large"/>}/>
        <DrawerLink link="/sales" title="Manage sales" icon={<AddchartIcon fontSize="large"/>}/>
        <DrawerLink link="/intents" title="Manage intents" icon={<ChatOutlinedIcon fontSize="large"/>}/>
        <DrawerLink link="/all-jobs" title="All Jobs" icon={<BallotOutlinedIcon fontSize="large"/>}/>
        <DrawerLink link="/add-job" title="Add Job" icon={<AddBoxOutlinedIcon fontSize="large"/>}/>

      </List>
    </Fragment>
  );
};

export default SideDrawer;
