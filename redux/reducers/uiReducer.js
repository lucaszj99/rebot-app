import * as ActionType from "../ActionTypes";

const initialState = {
  loading: false,
  errors: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionType.SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case ActionType.CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null,
      };
    case ActionType.LOADING_UI:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
