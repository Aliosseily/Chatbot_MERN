import React, { useState, useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import AuthContext from "../../store/auth-context";
import classes from "./AuthForm.module.css";
import Input from "../Inputs/Input";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

const AuthForm = () => {
  const authCtx = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  let FORM_VALIDATION;
  if (isLogin) {
    FORM_VALIDATION = Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Please enter email"),
      password: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Please enter password"),
    });
  } else {
    FORM_VALIDATION = Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Please enter email"),
      password: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Please enter password"),
      name: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Please enter your name"),
    });
  }

  const INITIAL_FORM_STATE = {
    email: "",
    password: "",
    name: "",
  };

  return (
    <>
      <Formik
        initialValues={INITIAL_FORM_STATE}
        validationSchema={FORM_VALIDATION}
        onSubmit={(values) => {
          isLogin ? authCtx.onLogIn(values) : authCtx.onSignUp(values);
        }}
        //  validateOnBlur={false}
        //  validateOnChange={false}
      >
        <Form>
          <div className={classes.auth}>
            <section className={classes.greetings}>
              <h1>Antwerp</h1>
              <h2>{isLogin ? "Login" : "Register"}</h2>
            </section>
            <section className={classes.inputs}>
              {authCtx.error ? (
                <Alert severity="error">{authCtx.error}</Alert>
              ) : null}
              <br />
              {!isLogin && <Input label="Name" type="text" name="name" />}
              <Input label="Email" type="email" name="email" />
              <Input label="Password" type="password" name="password" />
              <button type="submit" className={classes.submitBtn}>
                {authCtx.isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Submit"
                )}
              </button>
              <section className={classes.register}>
                <p>
                  {isLogin ? "Not a member yet?  " : "Already a member? "}
                  <span onClick={switchAuthHandler}>
                    {!isLogin ? " Login" : " Register"}
                  </span>
                </p>
              </section>
            </section>
          </div>
        </Form>
      </Formik>
    </>
  );
};
export default AuthForm;

// import React, { useContext } from "react";
// import AuthContext from "../store/auth-context";
// import classes from "./AuthForm.module.css";
// import Input from "./Input";
// import CircularProgress from "@mui/material/CircularProgress";
// import Alert from "@mui/material/Alert";

// const AuthForm = () => {
//   const authCtx = useContext(AuthContext);

//   const SubmitHandler = (e) => {
//     e.preventDefault();
//     const data = {
//       email: "ali-oss@outlook.com",
//       password: "aly123",
//     };
//     authCtx.onLogIn(data);
//   };
//   return (
//     <form onSubmit={SubmitHandler} className={classes.auth}>
//       <section className={classes.greetings}>
//         <h1>Welcome</h1>
//         <h2>Login</h2>
//       </section>

//       <section className={classes.inputs}>
//         {authCtx.error ? <Alert severity="error">{authCtx.error}</Alert> : null}
//         <br />
//         <Input label="Email" type="email" />
//         <Input label="Password" type="password" />
//         <button type="submit" className={classes.submitBtn}>
//           {authCtx.isLoading ? (
//             <CircularProgress size={24} color="inherit" />
//           ) : (
//             "Submit"
//           )}
//         </button>
//         <section className={classes.register}>
//           <p>
//             Not a member yet? <span>Register</span>
//           </p>
//         </section>
//       </section>
//     </form>
//   );
// };

// export default AuthForm;
