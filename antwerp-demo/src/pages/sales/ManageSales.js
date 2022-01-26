import { Box, Grid, Paper } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Inputs/Button";
import Loader from "../../components/Layout/Loader";

import TableWrapper from "../../components/Layout/Table";
import useAxios from "../../hooks/use-axios";

const headers = [
  { id: "year", label: "Year" },
  { id: "cost", label: "Cost" },
  { id: "sales", label: "Sales" },
  { id: "profit", label: "Profit" },
];

const ManageSales = () => {
  const navigate = useNavigate();
  const { isLoading, error, sendRequest } = useAxios();
  const [tableBody, setTableBody] = useState([]);
  const onLoadSuccess = (res) => {
    const data = res.data.data;
    setTableBody(data);
  };

  useEffect(() => {
    sendRequest(
      {
        url: "http://localhost:4000/api/v1/sales",
      },
      onLoadSuccess
    );
  }, []);

  const onRowClicked = (id) => {
    console.log("id", id);
    navigate(`/sales/${id}`);
  };
  return (
    <Fragment>
      {isLoading && <Loader />}
      {!error?.success && <p className="errorText">{error?.message}</p>}
      {!isLoading && (
        <Paper>
          <Box p={2}>
            <Grid item xs={12} md={6} lg={2} margin={"1rem 0"}>
            <Link to="/addSales"><Button> Add</Button></Link>
            </Grid>
            <TableWrapper
              onRowClicked={onRowClicked}
              tableHeaders={headers}
              tableBody={tableBody}
              showActionIcons={false}
            />
          </Box>
        </Paper>
      )}
    </Fragment>
  );
};

export default ManageSales;
