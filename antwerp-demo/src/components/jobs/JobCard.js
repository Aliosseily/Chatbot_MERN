import { Grid, Link, Paper } from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment } from "react";
import classes from "./JobCard.module.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import EventNoteIcon from "@mui/icons-material/EventNote";
import moment from "moment";

const JobCard = (props) => {
  const { position, company, location, status, type, date } = props.data;
  return (
    <Fragment>
      <Grid item xs={12} md={6} lg={6}>
        <Paper className={classes.paper}>
          <Box className={classes.paper_header}>
            <Box
              sx={{
                "& > :not(style)": {
                  width: 60,
                  height: 60,
                  backgroundColor: "#2cb1bc",
                  textAlign: "center",
                  display: "grid",
                  alignItems: "center",
                  color: "#ffffff",
                  fontSize: "2rem",
                  textTransform: "capitalize"
                },
              }}
            >
              <Paper>{position.charAt(0)}</Paper>
            </Box>
            <Box className={classes.paper__title}>
              <h3>{position}</h3>
              <p>{company}</p>
            </Box>
          </Box>
          <Box className={classes.paper__body}>
            <div>
              <section>
                <LocationOnIcon className={classes.paper__icon} />
                <span>{location}</span>
              </section>
            </div>
            <div>
              <section>
                <EventNoteIcon className={classes.paper__icon} />
                <span>{moment(date).format("MMM Do YY")}</span>
              </section>
            </div>
            <div>
              <section>
                <BusinessCenterIcon className={classes.paper__icon} />
                <span className={classes.paper__type}>{type}</span>
              </section>
            </div>
            <div>
              <div
                className={`
                ${classes.paper__status} 
                ${classes[
                    status === 'pending' ? "paper__status--pending" :
                    status === 'interview' ? "paper__status--interview" :
                    status === 'declined' ? "paper__status--decline" :
                    null]}`}
              >
                {status}
              </div>
            </div>
            <div className={classes.actions}>
              <span className={`${classes.action} ${classes["action__edit"]}`}>
                <Link to="/">Edit</Link>
              </span>
              <button
                className={`${classes.action}  ${classes["action__delete"]}`}
              >
                Delete
              </button>
            </div>
          </Box>
        </Paper>
      </Grid>
    </Fragment>
  );
};

export default JobCard;
