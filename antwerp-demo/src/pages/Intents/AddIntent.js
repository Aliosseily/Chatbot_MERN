import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import IntentForm from "../../components/Intent/IntentForm";
import useAxios from "../../hooks/use-axios";

const AddIntent = () => {
  const navigate = useNavigate();
  const { isLoading, error, sendRequest } = useAxios();
  const onAddIntentHandler = (intent) => {
    sendRequest(
      {
        url: `http://localhost:4000/api/v1/intent/`,
        method: "POST",
        data: intent,
      },
      () => {
        navigate("/intents");
      }
    );
  };
  return (
    <Fragment>
      <Paper>
        <Box p={5}>
          <IntentForm
            onAddIntentHandler={onAddIntentHandler}
            isLoading={isLoading}
            error={error}
          />
        </Box>
      </Paper>
    </Fragment>
  );
};

export default AddIntent;
