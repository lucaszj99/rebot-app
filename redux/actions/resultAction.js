import axios from "axios";
import * as ActionType from "../ActionTypes";

export const getPremiseSearch = (searchData) => (dispatch) => {
  dispatch({ type: ActionType.LOADING_RESULTS });
  axios
    .post(
      "https://asia-southeast2-rebot-ef7ef.cloudfunctions.net/api/rebotapp/search",
      searchData
    )
    .then((res) => {
      dispatch({
        type: ActionType.SET_RESULTS,
        payload: res.data.results,
      });
    })
    .catch((err) => console.log(err));
};
