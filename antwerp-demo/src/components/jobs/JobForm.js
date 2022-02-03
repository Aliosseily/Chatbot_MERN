import React, { Fragment } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Grid } from "@mui/material";
import Input from "../Inputs/Input";
import Button from "../Inputs/Button";
import FormikSelect from "../Inputs/FormikSelect";
import classes from "./JobForm.module.css";

const FORM__VALIDATION = Yup.object({
  position: Yup.string().required("Please add position"),
  company: Yup.string().required("Please add company"),
  location: Yup.string().required("Please add location"),
  status: Yup.string().required("Please select status"),
  type: Yup.string().required("Please select type"),
});

const status = [
  { id: 1, title: "interview" },
  { id: 2, title: "declined" },
  { id: 3, title: "pending" },
];
const type = [
  { id: 1, title: "full-time" },
  { id: 2, title: "part-time" },
  { id: 3, title: "remote" },
  { id: 4, title: "internship" },
];

const JobForm = ({ addJobHandler, editedJob, editJobHandler }) => {
  const INITIAL_FORM_STATE = {
    position: editedJob ? editedJob?.position : "",
    company: editedJob ? editedJob?.company : "",
    location: editedJob ? editedJob?.location : "",
    status: editedJob ? editedJob?.status : "",
    type: editedJob ? editedJob?.type : "",
  };
  return (
    <Fragment>
      <h2>Add job</h2>
      <Formik
        initialValues={INITIAL_FORM_STATE}
        validationSchema={FORM__VALIDATION}
        onSubmit={(values, actions) => {
          editedJob
            ? editJobHandler(values)
            : addJobHandler(values).then(() => {
                actions.resetForm({
                  values: {
                    position: "",
                    company: "",
                    location: "",
                    status: "",
                    type: "",
                  },
                });
              });
        }}
        // validateOnBlur={false}
        validateOnChange={true}
      >
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4}>
              <Input label="Position" type="text" name="position" />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Input label="Company" type="text" name="company" />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Input label="Location" type="text" name="location" />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <FormikSelect label="Status" name="status" options={status} />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <FormikSelect label="Type" name="type" options={type} />
            </Grid>
            <Grid item xs={12} md={4} lg={2}>
              <Button type="submit" className={classes.submit}>
                Submit
              </Button>
            </Grid>
            <Grid item xs={12} md={4} lg={2}>
              <Button type="button" className={classes.clearBtn}>
                Clear
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </Fragment>
  );
};

export default JobForm;
