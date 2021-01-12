import { AUTH_ERROR, LOGIN_FAIL, LOGOUT } from "../actions/types";

const initialState = {
  theme: true,
  loading: false,
};

export default function (state = initialState, action) {
  const { type } = action;
  //action has the coming data init
  switch (type) {
    case "LIGHT":
      return {
        ...state,
        theme: true,
      };
    case "DARK":
      return {
        ...state,
        theme: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
