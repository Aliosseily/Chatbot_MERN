import { Fragment, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ManageSales from "./pages/sales/ManageSales";
import SalesInfo from "./pages/sales/SalesInfo";
import AuthContext from "./store/auth-context";
import AddSales from "./pages/sales/AddSales";
import Intents from "./pages/Intents/Intents";
import AddIntent from "./pages/Intents/AddIntent";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Fragment>
      {!authCtx.isLoggedIn && (
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<Navigate replace to="/auth" />} />
        </Routes>
      )}

      {authCtx.isLoggedIn && (
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route path="/dashboard"  element={<Dashboard />} />
            <Route path="/profile"  element={<Profile />} />
            <Route path="/sales"  element={<ManageSales />} />
            <Route path="/addSales"  element={<AddSales />} />
            <Route path="/sales/:id"  element={<SalesInfo />} />
            <Route path="/intents"  element={<Intents />} />
            <Route path="/addintent"  element={<AddIntent />} />
          </Route>
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      )}
    </Fragment>
  );
}

export default App;
