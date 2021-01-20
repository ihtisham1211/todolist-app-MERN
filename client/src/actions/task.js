import axios from "axios";
import { setAlert } from "./alert";
import { url } from "../utils/proxy";

//**********************************
//***********addList
//**********************************
export const addList = (token, listName) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };
  const body = JSON.stringify({ listName });
  try {
    const res = await axios.post(url + "/api/task/add_list", body, config);

    dispatch(getData(token));
    dispatch(setAlert("List added", "success"));
  } catch (error) {
    dispatch(setAlert("Failed To Add List", "error"));
  }
};
//**********************************
//***********deleteList
//**********************************
export const deleteList = (token, listID) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };
  try {
    const res = await axios.delete(
      url + "/api/task/delete_list/" + listID,
      config
    );

    dispatch(getData(token));
    dispatch(setAlert("List deleted", "success"));
  } catch (error) {
    dispatch(setAlert("Failed To delete List", "error"));
  }
};
//**********************************
//***********getData
//**********************************
export const getData = (token) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };
  try {
    const res = await axios.get(url + "/api/task/get_lists", config);

    dispatch({
      type: "GET_All_TASKS",
      payload: res.data,
    });
    console.log("getData");
  } catch (e) {
    dispatch(setAlert("Failed To Get data", "error"));
  }
};

//**********************************
//***********addTask
//**********************************
export const addTask = (
  token,
  listId,
  date,
  title,
  description,

  status = "false"
) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };
  const body = JSON.stringify({ listId, date, title, description, status });
  try {
    const res = await axios.post(url + "/api/task/", body, config);
    dispatch(getData(token));
    console.log("addTask");
  } catch (error) {
    dispatch(setAlert("Failed To Add Task", "error"));
  }
};

//**********************************
//***********deleteTask
//**********************************
export const deleteTask = (token, listId, taskId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };

  try {
    const res = await axios.delete(
      url + "/api/task/" + listId + "/" + taskId,
      config
    );
    dispatch(getData(token));
  } catch (error) {
    dispatch(setAlert("Failed To Delete Task", "error"));
  }
};

//**********************************
//***********clearList
//**********************************
export const clearList = (taskList, token) => async (dispatch) => {
  for (var i = 0; i < taskList.length; i++) {
    dispatch(deleteTask(token, taskList[i]._id, taskList[i].user));
  }
  console.log("clearList");
};
//**********************************
//***********updateTask
//**********************************
export const updateTask = (
  token,
  id,
  user,
  title,
  date,
  description,
  status,
  day,
  month,
  year
) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };
  const body = JSON.stringify({ title, date, description, status });
  try {
    const res = await axios.patch(url + "/api/task/" + id, body, config);
    console.log("updateTask");
  } catch (error) {
    dispatch(setAlert("Failed To Update Task", "error"));
  }
};
