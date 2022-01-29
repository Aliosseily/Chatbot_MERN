import React, { Fragment } from "react";
import classes from "./Input.module.css";

const GeneralInput = (props) => {
  return (
    <Fragment>
      <label>{props.label}</label>
      <input {...props} className={classes.input} />
    </Fragment>
  );
};

export default GeneralInput;
