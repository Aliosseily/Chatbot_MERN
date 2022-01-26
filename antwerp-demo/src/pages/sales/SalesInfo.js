import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/Layout/Loader";
import SalesForm from "../../components/Sales/SalesForm";
import useAxios from "../../hooks/use-axios";

const SalesInfo = () => {
  const param = useParams();
  const { isLoading, error, sendRequest } = useAxios();
  const [yearSales, setYearSales] = useState(null);
  const [success, setSuccess] = useState(false);


  const onLoadSuccess = (data) => {
    console.log(data);
    setYearSales(data.data.data);
  };
  console.log("yearSales", yearSales);
  useEffect(() => {
    sendRequest(
      {
        url: `http://localhost:4000/api/v1/sales/${param.id}`,
      },
      onLoadSuccess
    );
  }, [sendRequest, param.id]);

  const updateSalesHandler = (data) => {
    sendRequest(
      {
        url: `http://localhost:4000/api/v1/sales/${param.id}`,
        method: "PUT",
        data: data,
      },
      (data) => {
        setSuccess(true);
        onLoadSuccess(data);
      }
    );
  };

 

  return (
    <Fragment>
      {isLoading && <Loader/>}
      {error && <p className="errorText">{error}</p>}
      {yearSales && (
        <SalesForm
          process={"Update"}
          success={success}
          yearSales={yearSales}
          updateSalesHandler={updateSalesHandler}
          
        />
      )}
    </Fragment>
  );
};

export default SalesInfo;
