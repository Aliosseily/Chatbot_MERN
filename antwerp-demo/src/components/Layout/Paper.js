import React, { Fragment } from "react";
import { Paper, Box } from "@mui/material";

const PaperWrapper = (props) => {
  return (
    <Fragment>
      <Paper>
        <Box p={3}>{props.children}</Box>
      </Paper>
    </Fragment>
  );
};

export default PaperWrapper;
