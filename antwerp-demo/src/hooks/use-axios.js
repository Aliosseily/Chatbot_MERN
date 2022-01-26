import { useCallback, useReducer } from "react";
import axios from "axios";

const initialState = {
  isLoading: false,
  error: null,
};

const httpReducer = (state, { type, errorMessage }) => {
  switch (type) {
    case "SEND":
      return {
        isLoading: true,
        error: null,
      };
    case "RESPONSE":
      return {
        isLoading: false,
        error: null,
      };
    case "ERROR":
      return {
        isLoading: false,
        error: errorMessage,
      };
    default:
      return {};
  }
};

const useAxios = () => {
  const [httpState, dispatch] = useReducer(httpReducer, initialState);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    dispatch({ type: "SEND" });
    try {
      const response = await axios({
        method: requestConfig.method ? requestConfig.method : "GET",
        url: requestConfig.url,
        responseType: "json",
        data: requestConfig.data,
        cancelToken: requestConfig.cancel,
        headers: requestConfig.headers ? requestConfig.headers : null,
      });
      dispatch({ type: "RESPONSE" });
      applyData(response);
    } catch (err) {
      console.log("error0", err.response);
      dispatch({
        type: "ERROR",
        errorMessage: err?.response?.data?.message || "Something went wrong!",
      });
    }
  }, []);
  return {
    isLoading: httpState.isLoading,
    error: httpState.error,
    sendRequest,
  };
};

export default useAxios;
