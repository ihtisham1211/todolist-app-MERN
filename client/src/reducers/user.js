import { AUTH_ERROR, LOGIN_FAIL, LOGOUT } from "../actions/types";

const initialState = {
  created: false,
  theme: true,
  loading: false,
  name: localStorage.getItem("name"),
  image: localStorage.getItem("image"),
};

export default function (state = initialState, action) {
  const { type } = action;
  //action has the coming data init
  switch (type) {
    case "CREATED_USER":
      return {
        ...state,
        created: true,
      };
    case "FAILED_USER":
      return {
        ...state,
        created: false,
      };
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
    case "SET_NAME_AND_IMAGE":
      return {
        ...state,
        theme: true,
        loading: true,
        name: localStorage.getItem("name"),
        image: localStorage.getItem("image"),
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      return {
        loading: false,
      };
    default:
      return state;
  }
}
