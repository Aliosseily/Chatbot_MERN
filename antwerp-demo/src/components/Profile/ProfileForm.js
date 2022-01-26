import { Alert, Grid, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import React, { Fragment } from "react";
import Button from "../Inputs/Button";
import Input from "../Inputs/Input";

const FORM_VALIDATION = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Please enter email"),
  name: Yup.string()
    .min(3, "Must be 3 characters or more")
    .max(20, "Must be 20 characters or less")
    .required("Please enter name"),
  phone: Yup.string()
    .min(8, "Must be 8 characters")
    .max(8, "Must be 8 characters or less"),
});
const ProfileForm = ({
  userData,
  updateUserHandler,
  success,
  error,
  className
}) => {
  const INITIAL_FORM_STATE = {
    name: userData?.name,
    email: userData?.email,
    country: userData?.country,
    phone: userData?.phone,
  };
  return (
    <Fragment>
      <Formik
        initialValues={INITIAL_FORM_STATE}
        validationSchema={FORM_VALIDATION}
        onSubmit={(values) => {
          updateUserHandler(values);
        }}
        // validateOnBlur={false}
        validateOnChange={true}
      >
        <Form>
          <Stack sx={{ paddingBottom: "1rem", width: "100%" }}>
            {success && <Alert severity="success">User Profile Updated</Alert>}
            {error && <Alert severity="error">{error}</Alert>}
          </Stack>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4}>
              <Input label="Name" type="text" name="name" />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Input label="Email" type="email" name="email" />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Input label="Phone" type="number" name="phone" />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Input label="Country" type="text" name="country" />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Button type="submit" className={className} >
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </Fragment>
  );
};

export default ProfileForm;
