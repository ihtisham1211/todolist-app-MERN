import axios from "axios";
import { setAlert } from "./alert";
import { url } from "../utils/proxy";
//**********************************
//***********getAllTasks
//**********************************
export const getAllTasks = (userId, day, month, year) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.get(url + "/api/task/", config);
    let tasks = [];
    const userTask = res.data.map((task) => {
      let d = task.date.split("|")[1].split("/")[0];
      let m = task.date.split("|")[1].split("/")[1];
      let y = task.date.split("|")[1].split("/")[2];
      if (task.user === userId && d == day && m == month && y == year) {
        tasks.push(task);
      }
    });

    dispatch({
      type: "GET_All_TASKS",
      payload: tasks,
    });
    console.log("getAllTasks");
  } catch (e) {
    dispatch(setAlert("Failed To Get Tasks", "error"));
  }
};
//**********************************
//***********addTask
//**********************************
export const addTask = (
  user,
  title,
  description,
  token,
  day,
  month,
  year,
  status = "false"
) => async (dispatch) => {
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var newformat = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  var monthDateYear = day + "/" + month + "/" + year;
  var date = hours + ":" + minutes + " " + newformat + "|" + monthDateYear;

  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };
  const body = JSON.stringify({ title, date, description, status });
  try {
    const res = await axios.post(url + "/api/task/add", body, config);

    dispatch(getAllTasks(user, day, month, year));
    console.log("addTask");
  } catch (error) {
    dispatch(setAlert("Failed To Add Task", "error"));
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
    dispatch(getAllTasks(user, day, month, year));
  } catch (error) {
    dispatch(setAlert("Failed To Update Task", "error"));
  }
};
//**********************************
//***********deleteTask
//**********************************
export const deleteTask = (token, id, user, day, month, year) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };

  try {
    const res = await axios.delete(url + "/api/task/" + id, config);
    console.log("deleteTask");
    dispatch(getAllTasks(user, day, month, year));
  } catch (error) {
    dispatch(setAlert("Failed To Delete Task", "error"));
  }
};
