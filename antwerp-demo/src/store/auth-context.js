import React, { useState } from "react";
import useAxios from "../hooks/use-axios";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  onSignUp: (user) => {},
  onLogIn: (user) => {},
  onLogOut: () => {},
});

export const AuthContextProvider = (props) => {
  const { isLoading, error, sendRequest } = useAxios();
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const navigate = useNavigate();

  const userIsLoggedIn = !!token;
  const onLoginSuccess = (response) => {
    console.log("DONE", response);
    const { token,id,name,user  } = response?.data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify([{id,name,user}]));
    setToken(token);
    navigate("/", { replace: true });
  };

  const onSignupSuccess = (response) => {
    console.log("REGISTERE DONE ", response);
    const { token,id, name, user } = response?.data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify([{id,name,user}]));

    setToken(token);
    navigate("/", { replace: true });
  };

  const signupHandler = (credentials) => {
    sendRequest(
      {
        url: "http://localhost:4000/api/v1/users/register",
        method: "POST",
        data: credentials,
      },
      onSignupSuccess
    );
  };

  const loginHandler = (credentials) => {
    sendRequest(
      {
        url: "http://localhost:4000/api/v1/users/login",
        method: "POST",
        data: credentials,
      },
      onLoginSuccess
    );
  };
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token: token,
        isLoggedIn: userIsLoggedIn,
        onSignUp: signupHandler,
        onLogIn: loginHandler,
        onLogOut: logoutHandler,
        isLoading: isLoading,
        error: error,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
