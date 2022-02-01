import React, { Fragment } from "react";
import classes from "./SelectOptions.module.css";

const SelectOptions = (props) => {
  return (
    <Fragment>
      <label>{props.label}</label>
      <select className={classes.select} onChange={props.onChange}>
        {props.options.map((option) => {
          return <option  key={option.id}>{option.title}</option>;
        })}
      </select>
    </Fragment>
  );
};

export default SelectOptions;
