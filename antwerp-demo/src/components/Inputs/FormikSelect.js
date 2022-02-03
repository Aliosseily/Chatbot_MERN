import React, { Fragment } from "react";
import { useField } from "formik";
import classes from "./Input.module.css";

const FormikSelect = ({ label, ...props }) => {
  const { name, options } = props;
  const [field, meta] = useField(name);


  return (
    <Fragment>
      <label htmlFor={props.id || props.name} /*className={classes.label}*/>
        {label}
      </label>
      <select
        {...field}
        {...props}
        className={classes.input}
        // autoComplete="off"
      >
          <option value="">Select</option>
      {options.map((option) => {
        return <option key={option.id}>{option.title}</option>;
      })}
      </select>
      {meta.error ? <p className="errorText">{meta.error}</p> : null}
    </Fragment>
  );
};

export default FormikSelect;
