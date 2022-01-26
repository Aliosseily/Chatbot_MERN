import React, { Fragment } from "react";
import classes from "./Button.module.css";

const Button = ({ children, className, type, onClick }) => {
  return (
    <Fragment>
      <button
        onClick={onClick}
        type={type}
        className={`${classes.button} ${className}`}
      >
        {children}
      </button>
    </Fragment>
  );
};

export default Button;
