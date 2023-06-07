import axios from "axios";
import * as ActionType from "../ActionTypes";

export const getPremiseDetail = (premiseData) => (dispatch) => {
  dispatch({ type: ActionType.LOADING_PREMISE });
  axios
    .post(
      "https://asia-southeast2-rebot-ef7ef.cloudfunctions.net/api/rebotapp/premise-detail",
      premiseData
    )
    .then((res) => {
      dispatch({
        type: ActionType.SET_PREMISE,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
