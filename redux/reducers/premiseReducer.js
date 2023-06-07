import * as ActionType from "../ActionTypes";

const initialState = {
  loading: false,
  premise: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionType.LOADING_PREMISE:
      return {
        ...state,
        loading: true,
      };
    case ActionType.SET_PREMISE:
      return {
        ...state,
        loading: false,
        premise: action.payload,
      };
    default:
      return state;
  }
}
