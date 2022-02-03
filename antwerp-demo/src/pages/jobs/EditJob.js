import { Alert } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JobForm from "../../components/jobs/JobForm";
import Loader from "../../components/Layout/Loader";
import PaperWrapper from "../../components/Layout/Paper";
import useAxios from "../../hooks/use-axios";

const EditJob = () => {
  const { id } = useParams();
  const { isLoading, error, sendRequest } = useAxios();
  const [job, setJob] = useState();
  const [succesfullyEdited, setSuccesfullyEdited] = useState(false);



  useEffect(() => {
    sendRequest(
      {
        url: `http://localhost:4000/api/v1/jobs/${id}`,
      },
      (data) => {
        setJob(data?.data?.data);
      }
    );
  }, [sendRequest, id]);

  const editJobHandler = (job) => {
    sendRequest(
      {
        url: `http://localhost:4000/api/v1/jobs/${id}`,
        method: "PUT",
        data: job,
      },
      () => {
        setSuccesfullyEdited(true);
      }
    );
  };

  return (
    <Fragment>
      {isLoading && <Loader />}
      <PaperWrapper>
        {succesfullyEdited && <Alert severity="success">New Job Created!</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
        {job && (
          <JobForm editedJob={job} editJobHandler={editJobHandler} />
        )}
      </PaperWrapper>
    </Fragment>
  );
};

export default EditJob;
