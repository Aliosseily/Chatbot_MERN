import React, { Fragment } from "react";
import { useField } from "formik";
import classes from "./Input.module.css";

const Input = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Fragment>
      <label htmlFor={props.id || props.name} className={classes.label}>
        {label}
      </label>
      <input
        {...field}
        {...props}
        className={classes.input}
        // autoComplete="off"
      />
      {meta.error ? <p className="errorText">{meta.error}</p> : null}
    </Fragment>
  );
};

export default Input;
