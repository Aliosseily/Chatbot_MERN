import React, { Fragment, useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import Barchart from "../components/Layout/Dashboard/Barchart";
import DashboardCard from "../components/Layout/Dashboard/DashboardCard";
import useAxios from "../hooks/use-axios";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import MoneyIcon from "@mui/icons-material/Money";
import Loader from "../components/Layout/Loader";

const Dashboard = () => {
  const {isLoading, error, sendRequest } = useAxios();
  const [sales, setSales] = useState(null);
  const [yearsOptions, setYearsOptions] = useState([]);

  const onLoadSuccess = (res) => {
    setSales(res.data.data);
  };
  useEffect(() => {
    sendRequest(
      {
        url: "http://localhost:4000/api/v1/sales",
      },
      (data) => {
        setYearsOptions(data?.data?.data)
        getYearSales(data?.data?.data[0]._id)
      }
    );
  },[sendRequest])

  const getYearSales = (yearId) => {
    sendRequest(
      {
        url: `http://localhost:4000/api/v1/sales/${yearId}`,
      },
      onLoadSuccess
    );
  }




  const onSelectYear = (e) => {
    sendRequest(
      {
        url: `http://localhost:4000/api/v1/sales/${e.target.value}`,
      },
      onLoadSuccess
    );
  };

  return (
    <Fragment>
      {error && <p className="errorText">{error}</p>}
      {isLoading && <Loader />}
      {sales ? (
        <Fragment>
          <label htmlFor="gender"> Year </label>
          <select name="gender" onChange={onSelectYear}>
            {yearsOptions.map((year)=>{
              return(
                <option key={year._id} value={year._id}>{year.year}</option>
              )
            })}
          </select>
          <Box mt={5} sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <DashboardCard
                icon={<MoneyIcon fontSize="large" />}
                title="Total cost amount"
                amount={sales.cost}
                styles={{
                  borderBottom: "5px solid #E9B949",
                  color: "#E9B949",
                  backgroundColorIcon: "#FCEFC7",
                }}
              />
              <DashboardCard
                title="Total sales amount"
                icon={<LocalAtmIcon fontSize="large" />}
                amount={sales.sales}
                styles={{
                  borderBottom: "5px solid #647ACB",
                  color: "#647ACB",
                  backgroundColorIcon: "#F4E8F9",
                }}
              />
              <DashboardCard
                icon={<PriceCheckIcon fontSize="large" />}
                amount={sales.profit}
                title="Total profit amount"
                styles={{
                  borderBottom: "5px solid #D66A6A",
                  color: "#D66A6A",
                  backgroundColorIcon: "#FFEEEE",
                }}
              />
            </Grid>
          </Box>
          <Grid item xs={12} md={12} lg={12}>
            <Box mt={4} mb={2}>
              <Typography color="#545454" textAlign="center" variant="h5">
                Monthly sales
              </Typography>
            </Box>
            <Barchart data={sales} />
          </Grid>
        </Fragment>
      ) : (
        null
      )}
    </Fragment>
  );
};

export default Dashboard;
