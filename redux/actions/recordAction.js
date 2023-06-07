import axios from "axios";
import * as ActionType from "../ActionTypes";

export const getVisitRecord = () => (dispatch) => {
  dispatch({ type: ActionType.LOADING_RECORDS });
  axios
    .get(
      "https://asia-southeast2-rebot-ef7ef.cloudfunctions.net/api/rebotapp/record"
    )
    .then((res) => {
      dispatch({
        type: ActionType.SET_RECORDS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const checkInPremise = (premiseData, navigation) => (dispatch) => {
  dispatch({ type: ActionType.LOADING_RESULTS });
  axios
    .post(
      `https://asia-southeast2-rebot-ef7ef.cloudfunctions.net/api/${premiseData}`
    )
    .then((res) => {
      dispatch({ type: ActionType.CLEAR_ERRORS });
      dispatch({
        type: ActionType.SET_RESULTS,
        payload: res.data,
      });
    })
    .then(navigation.navigate("Result"))
    .catch((err) => {
      console.log(err);
      dispatch({
        type: ActionType.SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const checkOutPremiseScan = (premiseData, navigation) => (dispatch) => {
  dispatch({ type: ActionType.LOADING_RESULTS });
  axios
    .post(
      `https://asia-southeast2-rebot-ef7ef.cloudfunctions.net/api/${premiseData}`
    )
    .then((res) => {
      dispatch({ type: ActionType.CLEAR_ERRORS });
      dispatch({
        type: ActionType.SET_RESULTS,
        payload: res.data,
      });
    })
    .then(navigation.navigate("Result"))
    .catch((err) => {
      console.log(err);
      dispatch({
        type: ActionType.SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const checkOutPremiseManual = (premiseId) => (dispatch) => {
  dispatch({ type: ActionType.LOADING_RESULTS });
  axios
    .post(
      `https://asia-southeast2-rebot-ef7ef.cloudfunctions.net/api/checkout/${premiseId}`
    )
    .then((res) => {
      dispatch({ type: ActionType.CLEAR_ERRORS });
      dispatch({
        type: ActionType.SET_RESULTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: ActionType.SET_ERRORS,
        payload: err.response.data,
      });
    });
};
