import axios from "axios";
import * as ActionType from "../ActionTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";

const setAuthorizationHeader = (token) => {
  try {
    AsyncStorage.setItem("FBIdToken", token);
    const FBIdToken = `Bearer ${token}`;
    axios.defaults.headers.common["Authorization"] = FBIdToken;
  } catch (e) {
    console.log(e);
  }
};

export const loginUser = (userData, navigation) => (dispatch) => {
  console.log(userData);
  axios
    .post(
      "https://asia-southeast2-rebot-ef7ef.cloudfunctions.net/api/rebotapp/login",
      userData
    )
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch({ type: ActionType.CLEAR_ERRORS });
      dispatch(getUserData());
    })
    .then(() => {
      navigation.navigate("Home");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: ActionType.SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const signupUser = (signupData, navigation) => (dispatch) => {
  axios
    .post(
      "https://asia-southeast2-rebot-ef7ef.cloudfunctions.net/api/rebotapp/signup",
      signupData
    )
    .then((res) => {
      console.log(res.data.token);
      setAuthorizationHeader(res.data.token);
      dispatch({ type: ActionType.CLEAR_ERRORS });
      dispatch(getUserData());
    })
    .then(() => {
      navigation.navigate("Home");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getUserData = () => (dispatch) => {
  dispatch({ type: ActionType.LOADING_USER });
  axios
    .get(
      "https://asia-southeast2-rebot-ef7ef.cloudfunctions.net/api/rebotapp/profile"
    )
    .then((res) => {
      dispatch({
        type: ActionType.SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const clearError = () => (dispatch) => {
  dispatch({ type: ActionType.CLEAR_ERRORS });
};
