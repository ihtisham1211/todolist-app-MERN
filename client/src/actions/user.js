import axios from "axios";
import {CREATED_USER, FAILED_USER} from "./types";
import {setAlert} from "./alert";
import {login} from "./auth";

export const createUser = (name, email, password) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const body = JSON.stringify({name, email, password});

    try {
        const res = await axios.post("/api/user/add", body, config);
        dispatch({
            type: CREATED_USER,
        });
        dispatch(setAlert("User Created", "success"));
        dispatch(login(email, password));
    } catch (error) {
        dispatch({
            type: FAILED_USER,
        });
        dispatch(setAlert("Failed To Create User", "danger"));
    }
};

export const themeChange = (theme) => async (dispatch) => {
    if (theme === true) {
        dispatch({
            type: "DARK",
        });
    } else {
        dispatch({
            type: "LIGHT",
        });
    }
};
