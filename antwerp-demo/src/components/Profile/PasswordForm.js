import { Alert, Grid, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import React, { Fragment } from "react";
import * as Yup from "yup";
import Button from "../Inputs/Button";
import Input from "../Inputs/Input";

const INITIAL_Password_FORM_STATE = {
  oldPassword: "",
  newPassword: "",
};
const FORM_Password_VALIDATION = Yup.object({
  oldPassword: Yup.string().required("Please enter old password"),
  newPassword: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Please enter new password"),
});
const PasswordForm = ({
  updatePasswordHandler,
  successPassword,
  error,
  className,
}) => {
  return (
    <Fragment>
      <Formik
        initialValues={INITIAL_Password_FORM_STATE}
        validationSchema={FORM_Password_VALIDATION}
        onSubmit={(values) => {
          console.log("values", values);
          updatePasswordHandler(values);
        }}
        // validateOnBlur={false}
        validateOnChange={true}
      >
        <Form>
          <Stack sx={{ paddingBottom: "1rem", width: "100%" }}>
            {successPassword && (
              <Alert severity="success">Password Updated</Alert>
            )}
            {error && <Alert severity="error">{error}</Alert>}
          </Stack>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4}>
              <Input label="Old password" type="text" name="oldPassword" />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Input label="New password" type="text" name="newPassword" />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Button type="submit" className={className}>
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </Fragment>
  );
};

export default PasswordForm;
