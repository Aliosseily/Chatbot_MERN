import { Alert, Grid, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import React, { Fragment } from "react";
import Button from "../Inputs/Button";
import Input from "../Inputs/Input";
import * as Yup from "yup";
import Loader from "../Layout/Loader";
import classes from "./IntentForm.module.css";

const INITIAL_FORM_STATE = {
  request: "",
  response: "",
};
const FORM__VALIDATION = Yup.object({
  request: Yup.string().required("Please enter Request"),
  response: Yup.string().required("Please enter response"),
});
const IntentForm = ({ onAddIntentHandler, isLoading, error }) => {
  return (
    <Fragment>
      <Formik
        initialValues={INITIAL_FORM_STATE}
        validationSchema={FORM__VALIDATION}
        onSubmit={(values) => {
          onAddIntentHandler(values);
        }}
        // validateOnBlur={false}
        validateOnChange={true}
      >
        <Form>
          <Stack sx={{ paddingBottom: "1rem", width: "100%" }}>
            {error && <Alert severity="error">{error}</Alert>}
          </Stack>
          {isLoading && <Loader />}
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4}>
              <Input label="Request" type="text" name="request" />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Input label="Response" type="text" name="response" />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Button className={classes.intent__button} type="submit">
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </Fragment>
  );
};

export default IntentForm;
