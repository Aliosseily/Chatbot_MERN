import React from "react";
import classes from "./DashboardCard.module.css";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  padding: "1.5rem 3rem",
  color: theme.palette.text.secondary,
}));

const DashboardCard = (props) => {
  const { borderBottom, color,backgroundColorIcon } = props.styles;
  const { amount, icon,title } = props;
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Item style={{ borderBottom: borderBottom }}>
        <section>
          <header className={classes.item__header}>
            <span style={{ color: color }} className={classes.item__count}>
              {amount}
            </span>
            <span
              style={{ color: color, backgroundColor: backgroundColorIcon }}
              className={classes.item__icon}
            >
              {icon}
            </span>
          </header>
          <h3>{title}</h3>
        </section>
      </Item>
    </Grid>
  );
};

export default DashboardCard;
