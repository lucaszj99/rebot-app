import * as ActionType from "../ActionTypes";

const initialState = {
  records: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionType.SET_RECORDS:
      return {
        ...state,
        loading: false,
        records: action.payload,
      };
    case ActionType.LOADING_RECORDS:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
