import { Grid, Paper } from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Inputs/Button";
import Loader from "../../components/Layout/Loader";
import TableWrapper from "../../components/Layout/Table";
import useAxios from "../../hooks/use-axios";


const headers = [
  { id: "request", label: "Request" },
  { id: "response", label: "Response" },
];

const Intents = () => {
  const { isLoading, error, sendRequest } = useAxios();
  const [tableBody, setTableBody] = useState([]);

  const onLoadSuccess = (data) => {
    setTableBody(data?.data?.data);
  };

  useEffect(() => {
    sendRequest(
      {
        url: "http://localhost:4000/api/v1/intent",
      },
      onLoadSuccess
    );
  }, []);

  const onDeleteIntent = (id) => {
    if (window.confirm("Delete this item?")) {
      sendRequest(
        {
          url: `http://localhost:4000/api/v1/intent/${id}`,
          method: "DELETE",
        }, //      setChatlist((prevState) => [...prevState, conversation]);
        (data) => {
          setTableBody((prevState) =>
            prevState.filter((intent) => intent._id !== data?.data?.data?._id)
          );
        }
      );
    }
  };
  return (
    <Fragment>
      {isLoading && <Loader />}
      {!error?.success && <p className="errorText">{error?.message}</p>}
      {!isLoading && (
        <Paper>
          <Box p={2}>
            <Grid item xs={12} md={6} lg={2} margin={"1rem 0"}>
              <Link to="/addintent">
                <Button> Add</Button>
              </Link>
            </Grid>
            <TableWrapper
              onRowClicked={() => {}}
              tableHeaders={headers}
              tableBody={tableBody}
              showActionIcons={true}
              onDeleteHandler={onDeleteIntent}
            />
          </Box>
        </Paper>
      )}
    </Fragment>
  );
};

export default Intents;
