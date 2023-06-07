import * as ActionType from "../ActionTypes";

const initialState = {
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionType.SET_USER:
      return {
        ...action.payload,
        loading: false,
      };
    case ActionType.LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
