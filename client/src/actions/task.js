import axios from "axios";
import { setAlert } from "./alert";
import { url } from "../utils/proxy";
import { getCurrentDate } from "../utils/dateFunction";

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

    dispatch({
      type: "ADD_LIST",
      payload: res.data,
    });
    dispatch(setAlert("List added", "success"));
  } catch (error) {
    dispatch(setAlert("Failed To Add List", "error"));
  }
};
//**********************************
//***********deleteList
//**********************************
export const deleteList = (token, listID) => async (dispatch) => {
  dispatch({
    type: "REMOVE_LIST",
    payload: listID,
  });

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
    dispatch(getNumbers(res.data));
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
  checkedId = null,
  listData = null,
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

    dispatch({
      type: "ADD_TASK",
      payload: { listId, data: res.data },
    });

    if (checkedId === listId) {
      dispatch({
        type: "UPDATE_CLICKEDTASKLIST",
        payload: res.data,
      });
    }
  } catch (error) {
    dispatch(setAlert("Failed To Add Task", "error"));
  }
};

//**********************************
//***********deleteTask
//**********************************
export const deleteTask = (token, listId, taskId) => async (dispatch) => {
  dispatch({
    type: "REMOVE_TASK",
    payload: {
      listId,
      taskId,
    },
  });

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
  } catch (error) {
    dispatch(setAlert("Failed To Delete Task", "error"));
  }
};

//**********************************
//***********handleClicked
//**********************************
export const handleClicked = (ListId, ListData) => async (dispatch) => {
  dispatch({
    type: "CLICKED",
    payload: ListId,
  });
  var data;
  ListData.map((list) => {
    if (list._id === ListId) {
      data = {
        label: list.listName,
        displayTask: list.taskList,
      };
    }
  });
  dispatch({
    type: "LOAD_CLICKED_LIST_TASK",
    payload: data,
  });
};
//**********************************
//***********loadTaskList
//**********************************
export const loadTaskList = (ListId, ListData) => async (dispatch) => {
  var data;
  ListData.map((list) => {
    if (list._id === ListId) {
      data = {
        label: list.listName,
        displayTask: list.taskList,
      };
    }
  });
  dispatch({
    type: "LOAD_CLICKED_LIST_TASK",
    payload: data,
  });
};

//**********************************
//***********getNumbers
//**********************************
export const getNumbers = (taskList) => async (dispatch) => {
  var sd = 0;
  var selectedDateNTime = getCurrentDate();
  // Scheduled
  taskList.map((l) => {
    return l.taskList.map((t) => {
      const dts = new Date(t.date);
      if (selectedDateNTime.getFullYear() <= dts.getFullYear()) {
        if (selectedDateNTime.getMonth() <= dts.getMonth()) {
          if (selectedDateNTime.getDate() < dts.getDate()) {
            sd = sd + 1;
          }
        }
      }
    });
  });
  var td = 0;
  //today
  taskList.map((l) => {
    return l.taskList.map((t) => {
      const dts = new Date(t.date);
      if (
        selectedDateNTime.getDate() === dts.getDate() &&
        selectedDateNTime.getMonth() === dts.getMonth() &&
        selectedDateNTime.getFullYear() === dts.getFullYear()
      ) {
        td = td + 1;
      }
    });
  });

  const payload = {
    td,
    sd,
  };
  dispatch({
    type: "SET_NUMBERS",
    payload,
  });
};
//**********************************
//***********handleClicked
//**********************************
export const handleUnClicked = () => async (dispatch) => {
  dispatch({
    type: "UNCLICKED",
  });
};

//**********************************
//***********statusChange
//**********************************
export const statusChange = (token, listId, taskId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };

  try {
    const res = await axios.patch(
      url + "/api/task/status/" + listId + "/" + taskId,
      config
    );
    dispatch({
      type: "STATUS_CHANGE",
      payload: {
        listId,
        data: res.data,
      },
    });
  } catch (error) {
    dispatch(setAlert("Failed To update Task", "error"));
  }
};
//**********************************
//***********clickedTask
//**********************************
export const clickedTask = (data) => async (dispatch) => {
  dispatch({
    type: "CLICKED_TASK",
    payload: data,
  });
};
//**********************************
//***********unClickedTask
//**********************************
export const unClickedTask = () => async (dispatch) => {
  dispatch({
    type: "UNCLICKED_TASK",
  });
};

//**********************************
//***********unClickedTask
//**********************************
export const updateTask = (
  token,
  listId,
  taskId,
  date,
  title,
  description,
  status
) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };

  const body = JSON.stringify({ date, title, description, status });
  try {
    const res = await axios.patch(
      url + "/api/task/update_list/" + listId + "/" + taskId,
      body,
      config
    );

    if (res.data[0].listName) {
      dispatch({
        type: "GET_All_TASKS",
        payload: res.data,
      });
      dispatch(getNumbers(res.data));

    } else {
      dispatch({
        type: "UPDATE_TASK",
        payload: {
          listId,
          data: res.data,
        },
      });
    }
  } catch (error) {
    dispatch(setAlert("Failed To update Task", "error"));
  }
};
