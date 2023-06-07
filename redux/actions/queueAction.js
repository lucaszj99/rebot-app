import axios from "axios";
import * as ActionType from "../ActionTypes";
import { getUserData } from "../actions/userAction";

export const registerQueue = (premiseId) => (dispatch) => {
  dispatch({ type: ActionType.LOADING_QUEUE });
  axios
    .post(
      `https://asia-southeast2-rebot-ef7ef.cloudfunctions.net/api/queue/${premiseId}`
    )
    .then((res) => {
      dispatch({ type: ActionType.CLEAR_ERRORS });
      dispatch({
        type: ActionType.SET_QUEUE,
        payload: res.data,
      });
      dispatch(getUserData());
    })
    .catch((err) => {
      dispatch({
        type: ActionType.SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const leaveQueue = (queueData) => (dispatch) => {
  dispatch({ type: ActionType.LOADING_QUEUE });
  axios
    .post(
      `https://asia-southeast2-rebot-ef7ef.cloudfunctions.net/api/leavequeue/${queueData.premiseId}`
    )
    .then((res) => {
      dispatch({ type: ActionType.CLEAR_ERRORS });
      dispatch({
        type: ActionType.SET_QUEUE,
        payload: res.data,
      });
      dispatch(getUserData());
    })
    .catch((err) => {
      dispatch({
        type: ActionType.SET_ERRORS,
        payload: err.response.data,
      });
    });
};
