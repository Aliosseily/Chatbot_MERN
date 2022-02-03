import React, { Fragment, useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Alert, Grid, Paper, Stack } from "@mui/material";
import { Box } from "@mui/system";
import Input from "../Inputs/Input";
import Button from "../Inputs/Button";
import GeneralInput from "../Inputs/GeneralInput";
import classes from "./SalesForm.module.css";
import useAxios from "../../hooks/use-axios";
import { useNavigate, useParams } from "react-router-dom";


const FORM_VALIDATION = Yup.object({
  year: Yup.string()
    .required("Please enter year"),

});

const SalesForm = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const { process, success } = props;
  const { months, cost, sales, profit, year } = props.yearSales;
  const { isLoading, error, sendRequest } = useAxios();

  const INITIAL_FORM_STATE = {
    jan: process === "Update" ? months[0].amount : "",
    feb: process === "Update" ? months[1].amount : "",
    mar: process === "Update" ? months[2].amount : "",
    apr: process === "Update" ? months[3].amount : "",
    may: process === "Update" ? months[4].amount : "",
    jun: process === "Update" ? months[5].amount : "",
    jul: process === "Update" ? months[6].amount : "",
    aug: process === "Update" ? months[7].amount : "",
    sep: process === "Update" ? months[8].amount : "",
    oct: process === "Update" ? months[9].amount : "",
    nov: process === "Update" ? months[10].amount : "",
    dec: process === "Update" ? months[11].amount : "",
    cost: process === "Update" ? cost : 0,
    year: process === "Update" ? year : "",
  };

  const onDeleteSuccess = () => {
    navigate("/sales");
  };

  const deleteSales = () => {
    if (window.confirm("Delete the item?")) {
      sendRequest(
        {
          url: `http://localhost:4000/api/v1/sales/${params.id}`,
          method: "DELETE",
        },
        onDeleteSuccess
      );
    }
  };
  return (
    <Fragment>
      <Paper>
        <Box p={5}>
          <Formik
            initialValues={INITIAL_FORM_STATE}
            validationSchema={FORM_VALIDATION}
            onSubmit={(req) => {
              const monthsSales = [];
              const newobj = { ...req };
              delete newobj.cost;
              delete newobj.year;
              for (const property in newobj) {
                monthsSales.push({
                  month: `${property}`,
                  amount: `${req[property]}`,
                });
              }
              const finalObj = {
                cost: req.cost,
                year: req.year,
                months: monthsSales,
              };
              process === "Update"
                ? props.updateSalesHandler(finalObj)
                : props.AddNewSalesHandler(finalObj);
            }}
          >
            <Form>
              <Grid container spacing={2}>
                <Stack mb={5} sx={{ width: "100%" }}>
                  {success && (
                    <Alert severity="success">Sales updated</Alert>
                  )}
                  {error && <Alert severity="error">{error}</Alert>}
                </Stack>
                <Grid item xs={12} md={12} lg={12}>
                  <Input
                    style={{ width: "9rem" }}
                    disabled={process === "Update" ? true : false}
                    placeholder="Year"
                    label=""
                    type="number"
                    name="year"
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                  <Input label="Jan" type="number" name="jan" />
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                  <Input label="Feb" type="number" name="feb" />
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                  <Input label="Mar" type="number" name="mar" />
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                  <Input label="Apr" type="number" name="apr" />
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                  <Input label="May" type="number" name="may" />
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                  <Input label="Jun" type="number" name="jun" />
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                  <Input label="Jul" type="number" name="jul" />
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                  <Input label="Aug" type="number" name="aug" />
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                  <Input label="Sep" type="number" name="sep" />
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                  <Input label="Oct" type="number" name="oct" />
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                  <Input label="Nov" type="number" name="nov" />
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                  <Input label="Dec" type="number" name="dec" />
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                  <Input label="Cost" type="number" name="cost" />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <GeneralInput value={sales} label="Sales" disabled />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <GeneralInput value={profit} disabled label="Profit" />
                </Grid>
                <Grid item xs={12} md={6} lg={4} margin={"1.85rem 0"}>
                  <Button>Save Changes</Button>
                </Grid>
                {process === "Update" && 
                <Grid item xs={12} md={6} lg={4} margin={"1.85rem 0"}>
                  <Button
                    onClick={deleteSales}
                    type="button"
                    className={classes.delete_btn}
                  >
                    Delete
                  </Button>
                </Grid>
                  }
              </Grid>
            </Form>
          </Formik>
        </Box>
      </Paper>
    </Fragment>
  );
};

export default SalesForm;
