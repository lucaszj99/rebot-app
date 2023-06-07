import * as ActionType from "../ActionTypes";

const initialState = {
  loading: false,
  queue: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionType.LOADING_QUEUE:
      return {
        ...state,
        loading: true,
      };
    case ActionType.SET_QUEUE:
      return {
        ...state,
        loading: false,
        queue: action.payload,
      };
    default:
      return state;
  }
}
