import React, { useState, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import classes from "./HeaderDrawer.module.css";
import { Popper } from "@mui/material";
import AuthContext from "../../../store/auth-context";
import Modal from "../Modal/Modal";

const HeaderDrawer = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const openModalHandler = () => {
    setOpenModal(true);
  };
  const closeModalHandler = () => {
    setOpenModal(false);
  };

  const authCtx = useContext(AuthContext);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const openPoper = !!anchorEl;

  const logoutHandler = () => {
    authCtx.onLogOut();
  };
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav
      style={{
        height: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        background: "#ffffff",
        width:"103%"
      }}
    >
      <IconButton
      className={classes.nav_menu_web}
        onClick={ props.toggleDrawerHandler}
      >
        <MenuOpenOutlinedIcon fontSize="large" className={classes.nav__menu} />
      </IconButton>
      <IconButton
      className={classes.nav_menu_mobile}
        onClick={openModalHandler}
      >
        <MenuOpenOutlinedIcon fontSize="large" className={classes.nav__menu} />
      </IconButton>
      <section>
        <h2 className={classes.nav__h2}>Dashboard</h2>
      </section>
      <section>
        <button onClick={handleClick} className={classes.nav__button}>
          <AccountCircleIcon fontSize="small" />
          <div className={classes.nav__button__user__name} >{user[0].name}</div>
          <ArrowDropDownIcon fontSize="small" />
        </button>
        <Popper
          onClick={logoutHandler}
          className={classes.popper}
          open={openPoper}
          anchorEl={anchorEl}
        >
          <p>logout</p>
        </Popper>
        <Modal openModal={openModal} closeModalHandler={closeModalHandler} />
      </section>
    </nav>
  );
};

export default HeaderDrawer;
