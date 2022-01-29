import { Grid } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import GeneralInput from "../../components/Inputs/GeneralInput";
import Input from "../../components/Inputs/Input";
import SelectOptions from "../../components/Inputs/SelectOptions";
import JobCard from "../../components/jobs/JobCard";
import PaperWrapper from "../../components/Layout/Paper";
import useAxios from "../../hooks/use-axios";

const status = [
  { id: 1, title: "all" },
  { id: 2, title: "interview" },
  { id: 3, title: "declined" },
  { id: 4, title: "pending" },
];
const type = [
  { id: 1, title: "all" },
  { id: 2, title: "full-time" },
  { id: 3, title: "part-time" },
  { id: 4, title: "remote" },
  { id: 5, title: "internship" },
];
const sort = [
  { id: 1, title: "lates" },
  { id: 2, title: "oldes" },
  { id: 3, title: "a-z" },
  { id: 4, title: "z-a" },
];

const AllJobs = () => {
    const { isLoading, error, sendRequest } = useAxios();
    const [jobs, setJobs] = useState([]);

  useEffect(() => {

    sendRequest(
        {
          url: `http://localhost:4000/api/v1/jobs`,
        }, //      setChatlist((prevState) => [...prevState, conversation]);
        (data) =>setJobs(data?.data?.data)
      );
  },[sendRequest])

  return (
    <Fragment>
      <PaperWrapper>
        <h2>Search Form</h2>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={3}>
            <GeneralInput label="Search" type="text" name="search" />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <SelectOptions label="Status" options={status} />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <SelectOptions label="Type" options={type} />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <SelectOptions label="Sort" options={sort} />
          </Grid>
        </Grid>
      </PaperWrapper>
      <Grid container spacing={2} marginTop={5}>
        <Grid item xs={12} md={12} lg={12}>
          <h2>{jobs.length} Job Found</h2>
        </Grid>
        {jobs.map((job)=>{
            return(
                <JobCard data={{
                    position:job.position,
                    company:job.company,
                    location:job.location,
                    status:job.status,
                    type:job.type,
                    date:job.date
                }}/>
            )
        })}

      </Grid>
    </Fragment>
  );
};

export default AllJobs;
