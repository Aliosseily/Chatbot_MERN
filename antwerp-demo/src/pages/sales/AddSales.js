import React from "react";
import { useNavigate } from "react-router-dom";
import SalesForm from "../../components/Sales/SalesForm";
import useAxios from "../../hooks/use-axios";

const AddSales = () => {
  const navigate = useNavigate();
  const { isLoading, error, sendRequest } = useAxios();

  const AddNewSalesHandler = (data) => {
    console.log("RUUUNNNN");
    sendRequest(
      {
        url: `http://localhost:4000/api/v1/sales/`,
        method: "POST",
        data: data,
      },
      (data) => {
        console.log(navigate("/sales"));
      }
    );
  };

  return (
    <SalesForm
      process={"Add"}
      AddNewSalesHandler={AddNewSalesHandler}
      yearSales={[]}
    />
  );
};

export default AddSales;
