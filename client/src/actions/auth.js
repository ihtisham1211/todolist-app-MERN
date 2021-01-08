import axios from "axios";
import {
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
} from "./types";
import {setAlert} from "./alert";
import setAuthToken from "../utils/setAuthToken";

export const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get("https://todolist-demo-ihtisham1211.herokuapp.com//api/auth");
        dispatch({type: "SET_NAME", payload: res.data.name});
        dispatch({
            type: USER_LOADED,
            payload: res.data,
        });
        dispatch(setAlert("LOGIN SUCCESSFULL", "success"))
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
    const body = JSON.stringify({email, password});

    try {
        const res = await axios.post("https://todolist-demo-ihtisham1211.herokuapp.com//api/auth", body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });

        dispatch(loadUser());

    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
        dispatch({
            type: LOGIN_FAIL,
        });
    }
};

export const logout = () => (dispatch) => {
    dispatch({
        type: LOGOUT,
    });
};
