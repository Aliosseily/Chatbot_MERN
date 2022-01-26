import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Layout/Loader";
import UserProfile from "../components/Profile/UserProfile";
import useAxios from "../hooks/use-axios";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const { isLoading, error, sendRequest } = useAxios();
  const [success, setSuccess] = useState(false);
  const [successPassword, setSuccessPassword] = useState(false);

  const userLoacal = JSON.parse(localStorage.getItem("user"));

  const onLoadSuccess = (user) => {
    setUser(user?.data);
  };

  const onUpdateSuccess = (updatedUser) => {
    console.log("updatedUser", updatedUser);
    const { id, name, email } = updatedUser?.data?.data;
    localStorage.setItem("user", JSON.stringify([{ id, name, email }]));
    setSuccess(true);
    navigate("/profile");
  };

  useEffect(() => {
    sendRequest(
      {
        url: `http://localhost:4000/api/v1/users/${userLoacal[0].id}`,
      },
      onLoadSuccess
    );
    return () => {
      setSuccess(false);
    };
  }, [sendRequest]);

  const updateUserHandler = (updatedData) => {
    setSuccess(false);
    sendRequest(
      {
        url: `http://localhost:4000/api/v1/users/${userLoacal[0].id}`,
        method: "PUT",
        data: updatedData,
      },
      onUpdateSuccess
    );
  };

  const updatePasswordHandler = (updatedPassword) => {
    sendRequest(
      {
        url: `http://localhost:4000/api/v1/users/updatePassword/${userLoacal[0].id}`,
        method: "PUT",
        data: updatedPassword,
      },
      () => {
        setSuccessPassword(true);
      }
    );
  };


  return (
    <Fragment>
      {isLoading && <Loader />}
      {user && (
        <UserProfile
          userData={user}
          error={error}
          success={success}
          updateUserHandler={updateUserHandler}
          updatePasswordHandler={updatePasswordHandler}
          successPassword={successPassword}
        />
      )}
    </Fragment>
  );
};

export default Profile;
