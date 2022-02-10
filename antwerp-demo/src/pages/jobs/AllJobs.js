import { Grid } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import GeneralInput from "../../components/Inputs/GeneralInput";
import SelectOptions from "../../components/Inputs/SelectOptions";
import JobCard from "../../components/jobs/JobCard";
import Loader from "../../components/Layout/Loader";
import PaperWrapper from "../../components/Layout/Paper";
import Pagination from "@mui/material/Pagination";
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
  { id: 1, value:"-date", title: "latest" },
  { id: 2, value:"date", title: "oldest" },
  { id: 3, value:"position", title: "a-z" },
  { id: 4, value:"-position", title: "z-a" },
];

const AllJobs = () => {
  const { isLoading, error, sendRequest } = useAxios();
  const [jobs, setJobs] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState();

  useEffect(() => {
    sendRequest(
      {
        url: `http://localhost:4000/api/v1/jobs/?page=${page}&status=${statusFilter}&type=${typeFilter}&sort=${sortBy}&search=${search}`,
      },
      (data) => {
        setJobs(data?.data?.data);
        setPageCount(data?.data?.pages);
      }
    );
  }, [sendRequest, page, statusFilter, typeFilter, sortBy, search]);

  const statusFilterHandler = (e) => {
    setStatusFilter(e.target.value);
  };
  const typeFilterHandler = (e) => {
    setTypeFilter(e.target.value);
  };
  const sortHandler = (e) => {
    console.log(e.target.value)
    setSortBy(e.target.value);
  };
  const searchHandler = (e) => {
    setSearch(e.target.value);
  };
  const handleChange = (event, value) => {
    setPage(value);
  };

  const deleteJobHandler = (jobId) => {
    if (window.confirm("Are you want to delete this item ?")) {
      sendRequest(
        {
          url: `http://localhost:4000/api/v1/jobs/${jobId}`,
          method: "DELETE",
        },
        (data) => {
          setJobs((prevState) =>
            prevState.filter((job) => job._id !== data?.data?.data?._id)
          );
        }
      );
    }
  };

  return (
    <Fragment>
      <PaperWrapper>
        <h2>Search Form</h2>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={3}>
            <GeneralInput
              onChange={searchHandler}
              label="Search"
              type="text"
              name="search"
            />
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
            <SelectOptions
              onChange={sortHandler}
              label="Sort "
              options={sort}
            />
          </Grid>
        </Grid>
      </PaperWrapper>
      <Grid container spacing={2} marginTop={1}>
        <Grid item xs={12} md={12} lg={12}>
          {isLoading && <Loader />}
          <h2>{jobs.length} Job Found</h2>
          {error && <p className="errorText">{error}</p>}
        </Grid>
        {jobs.map((job) => {
          return (
            <JobCard
              key={job._id}
              data={{
                id: job._id,
                position: job.position,
                company: job.company,
                location: job.location,
                status: job.status,
                type: job.type,
                date: job.date,
                deleteJob: deleteJobHandler,
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
