import { AUTH_ERROR, LOGIN_FAIL, LOGOUT } from "../actions/types";

const initialState = {
  loading: false,
  editList: false,
  editTask: false,
  checkData: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  //action has the coming data init
  switch (type) {
    case "EDIT_ON":
      return {
        ...state,
        editList: true,
      };
    case "EDIT_OFF":
      return {
        ...state,
        editList: false,
      };
    case "EDITLIST_ON":
      return {
        ...state,
        editTask: true,
      };
    case "EDITLIST_OFF":
      return {
        ...state,
        editTask: false,
      };
    case "CHECKDATA":
      return {
        ...state,
        checkData: true,
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
        checkData: false,
      };
    default:
      return state;
  }
}
