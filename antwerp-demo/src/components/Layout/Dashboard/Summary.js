import React from "react";
import {  Paper,styled } from "@mui/material";
import classes from "./Summary.module.css";

const summary = [
  { title: "Total orders", value: "5,000",color: "#647ACB" },
  { title: "Total sales", value: "5,4500",color: "#8adf94" },
  { title: "Total costs", value: "42,000",color: "#E9B949" },
  { title: "Total profit", value: "5,000",color: "#D66A6A" },
];

const Item = styled(Paper)(({ theme }) => ({
    color: theme.palette.text.secondary,
  }));

const Summary = () => {
  return (
    <Item className={classes.summary}>
      <h4 className={classes.summary__header}>Summary of the year</h4>

        {summary.map((item) => {
            const { title,value, color} = item
          return (
            <div className={classes.summary__item}>
              <span>{title}</span>
              <span style={{color:color}}>$ {value}</span>
            </div>
          );
        })}
    </Item>
  );
};

export default Summary;
