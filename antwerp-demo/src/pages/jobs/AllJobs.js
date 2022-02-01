import { Grid } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import GeneralInput from "../../components/Inputs/GeneralInput";
import Input from "../../components/Inputs/Input";
import SelectOptions from "../../components/Inputs/SelectOptions";
import JobCard from "../../components/jobs/JobCard";
import Loader from "../../components/Layout/Loader";
import PaperWrapper from "../../components/Layout/Paper";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import useAxios from "../../hooks/use-axios";
import { Box } from "@mui/system";

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
  { id: 1, title: "latest" },
  { id: 2, title: "oldest" },
  { id: 3, title: "a-z" },
  { id: 4, title: "z-a" },
];

const AllJobs = () => {
  const { isLoading, error, sendRequest } = useAxios();
  const [jobs, setJobs] = useState([]);
  const [statusyy, setStatusyy] = useState("all");
  const [typeyy, setTypeyy] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState();

  useEffect(() => {
    sendRequest(
      {
        url: `http://localhost:4000/api/v1/jobs?page=${page}&status=${statusyy}&type=${typeyy}&sort=${sortBy}`,
        // url: `http://localhost:4000/api/v1/jobs?status=${statusyy}&type=${typeyy}`,
      }, //      setChatlist((prevState) => [...prevState, conversation]);
      (data) => {
        console.log(data);
        setJobs(data?.data?.data);
        setPageCount(data?.data?.pages);
      }
    );
  }, [sendRequest, page, statusyy, typeyy, sortBy]);

  const statusFilterHandler = (e) => {
    setStatusyy(e.target.value);
  };
  const typeFilterHandler = (e) => {
    setTypeyy(e.target.value);
  };
  const sortHandler = (e) => {
    setSortBy(e.target.value);
  };
  const handleChange = (event, value) => {
    console.log(value);
    setPage(value);
  };

  return (
    <Fragment>
      <PaperWrapper>
        <h2>Search Form</h2>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={3}>
            <GeneralInput label="Search" type="text" name="search" />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <SelectOptions
              onChange={statusFilterHandler}
              label="Status"
              options={status}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <SelectOptions
              onChange={typeFilterHandler}
              label="Type"
              options={type}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <SelectOptions onChange={sortHandler} label="Sort" options={sort} />
          </Grid>
        </Grid>
      </PaperWrapper>
      <Grid container spacing={2} marginTop={5}>
        <Grid item xs={12} md={12} lg={12}>
          {isLoading && <Loader />}
          <h2>{jobs.length} Job Found</h2>
        </Grid>
        {jobs.map((job) => {
          return (
            <JobCard
              data={{
                position: job.position,
                company: job.company,
                location: job.location,
                status: job.status,
                type: job.type,
                date: job.date,
              }}
            />
          );
        })}
      </Grid>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"flex-end"}
        margin={"2rem 0 4rem 0"}
      >
        <Pagination
          count={pageCount}
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
        />
      </Box>
    </Fragment>
  );
};

export default AllJobs;
