import * as ActionType from "../ActionTypes";

const initialState = {
  results: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionType.SET_RESULTS:
      return {
        ...state,
        loading: false,
        results: action.payload,
      };
    case ActionType.LOADING_RESULTS:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
