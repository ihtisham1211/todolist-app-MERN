import axios from "axios";
import {
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  USER_LOADED,
} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";
import { url } from "../utils/proxy";

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(url + "/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
    dispatch({
      type:"SET_LOADING",
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
//login user
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  // to change data into JSON
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(url + "/api/auth", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
    });
    dispatch(setAlert("Failed to login", "error"));
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('state');
  dispatch({
    type: LOGOUT,
  });
};
