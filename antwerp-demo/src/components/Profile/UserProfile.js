import { Paper, Tab, Tabs } from "@mui/material";
import React, { Fragment } from "react";
import classes from "./UserProfile.module.css";
import { Box } from "@mui/system";
import PropTypes from "prop-types";
import ProfileForm from "./ProfileForm";
import PasswordForm from "./PasswordForm";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const UserProfile = ({
  userData,
  updateUserHandler,
  updatePasswordHandler,
  successPassword,
  success,
  error,
}) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Fragment>
      <Paper className={classes.profile}>
        <Box p={1}>
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                borderBottom: "1px solid #f1f1f1",
                borderColor: "divider",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Profile" {...a11yProps(0)} />
                <Tab label="Password" {...a11yProps(1)} />
              </Tabs>
            </Box>
          </Box>
          <TabPanel value={value} index={0}>
            <ProfileForm
              userData={userData}
              updateUserHandler={updateUserHandler}
              updatePasswordHandler={updatePasswordHandler}
              successPassword={successPassword}
              success={success}
              error={error}
              className={classes.profile__button}
            />
          </TabPanel>

          <TabPanel value={value} index={1}>
            <PasswordForm
              updatePasswordHandler={updatePasswordHandler}
              successPassword={successPassword}
              error={error}
              className={classes.profile__button}
            />
          </TabPanel>
        </Box>
      </Paper>
    </Fragment>
  );
};

export default UserProfile;
