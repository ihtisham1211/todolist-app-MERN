import axios from "axios";
import { CREATED_USER, FAILED_USER } from "./types";
import { setAlert } from "./alert";
import { login } from "./auth";
import { url } from "../utils/proxy";

//**********************************
//***********createUser
//**********************************
export const createUser = (name, email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post(url + "/api/user/add", body, config);
    dispatch({
      type: CREATED_USER,
    });
    dispatch(setAlert("User Created", "success"));
    dispatch(login(email, password));
  } catch (error) {
    dispatch({
      type: FAILED_USER,
    });
    dispatch(setAlert("Failed To Create User", "error"));
  }
};

//**********************************
//***********updateUser
//**********************************

export const updateUser = (id, token, name, email, password, image) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };
  const body = JSON.stringify({ name, email, password, image });

  try {
    const res = await axios.patch(url + "/api/user/" + id, body, config);
    console.log("updateUser");
    dispatch(setAlert("User Updated", "success"));
  } catch (error) {
    dispatch(setAlert("Failed To Updated", "error"));
  }
};
//**********************************
//***********handleClicked
//**********************************
export const handleClicked = (ListId) => async (dispatch) => {
  dispatch({
    type: "CLICKED",
    payload: ListId,
  });
};
//**********************************
//***********editClick
//**********************************
export const editClick = (edit) => async (dispatch) => {
  if (edit === true) {
    dispatch({
      type: "EDIT_OFF",
    });
  } else {
    dispatch({
      type: "EDIT_ON",
    });
  }
};
//**********************************
//***********editClickDot
//**********************************
export const editClickDot = (edit) => async (dispatch) => {
  if (edit === true) {
    dispatch({
      type: "EDITLIST_OFF",
    });
  } else {
    dispatch({
      type: "EDITLIST_ON",
    });
  }
};
