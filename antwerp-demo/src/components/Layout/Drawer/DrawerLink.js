import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./DrawerLink.module.css";

const DrawerLink = (props) => {
  const { link, icon, title, onClick } = props;
  return (
    <NavLink
    onClick={onClick}
      to={link}
      className={({ isActive }) =>
        isActive
          ? `${classes.drawer__link} ${classes["drawer__link--active"]}`
          : `${classes.drawer__link}`
      }
    >
      <div className={classes.drawer__link__Content}>
        <section className={classes.drawer__icon}>{icon}</section>
        <p className={classes.drawer__title}>{title}</p>
      </div>
    </NavLink>
  );
};

export default DrawerLink;
