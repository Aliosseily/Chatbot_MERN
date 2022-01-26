import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import classes from "./Modal.module.css";
import {
  Box,
  DialogContent,
  Grid,
  IconButton,
  ListItemIcon,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BarChartIcon from "@mui/icons-material/BarChart";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import { Link } from "react-router-dom";
import DrawerLink from "../Drawer/DrawerLink";
import AddchartIcon from '@mui/icons-material/Addchart';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';

const Modal = (props) => {
  return (
    <Dialog
      PaperProps={{ style: { borderRadius: 6 } }}
      className={classes.dialog}
      fullScreen
      open={props.openModal}
    >
      <DialogTitle>
        <IconButton onClick={props.closeModalHandler}>
          <CloseIcon color="action" fontSize="large" />
        </IconButton>
      </DialogTitle>
      <DialogContent style={{ textAlign: "center" }}>
        <h1 className={classes.dialog__header}>Antwerp</h1>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <DrawerLink
            onClick={props.closeModalHandler}
            link="/dashboard"
            title="Stats"
            icon={
              <BarChartIcon
                
                fontSize="large"
              />
            }
          />
          <DrawerLink
            onClick={props.closeModalHandler}
            link="/profile"
            title="Profile"
            icon={
              <AccountBoxOutlinedIcon
                onClick={props.closeModalHandler}
                fontSize="large"
              />
            }
          />
               <DrawerLink onClick={props.closeModalHandler} link="/sales" title="Manage sales" icon={<AddchartIcon fontSize="large"/>}/>
        <DrawerLink onClick={props.closeModalHandler} link="/intents" title="Manage intents" icon={<ChatOutlinedIcon fontSize="large"/>}/>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
