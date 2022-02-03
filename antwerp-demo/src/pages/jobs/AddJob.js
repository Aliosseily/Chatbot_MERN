import React, { Fragment, useState } from "react";
import JobForm from "../../components/jobs/JobForm";
import Loader from "../../components/Layout/Loader";
import PaperWrapper from "../../components/Layout/Paper";
import { Alert } from "@mui/material";
import useAxios from "../../hooks/use-axios";

const AddJob = () => {
  const { isLoading, error, sendRequest } = useAxios();
  const [succesfullyAdded, setSuccesfullyAdded] = useState(false);
  const addJobHandler = async (job) => {
    await sendRequest(
      {
        url: `http://localhost:4000/api/v1/jobs`,
        method: "POST",
        data: job,
      },
      (data) => {
        setSuccesfullyAdded(true);
      }
    );
  };

  return (
    <Fragment>
      {isLoading && <Loader />}
      <PaperWrapper>
        {succesfullyAdded && <Alert severity="success">New Job Created!</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
        <JobForm addJobHandler={addJobHandler} />
      </PaperWrapper>
    </Fragment>
  );
};
export default AddJob;
