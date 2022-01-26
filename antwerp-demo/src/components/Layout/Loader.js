import React from "react";

import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = () => {
  return (
    <Box >
      <CircularProgress className="loader" fontSize="large" />
    </Box>
  );
};

export default Loader;
