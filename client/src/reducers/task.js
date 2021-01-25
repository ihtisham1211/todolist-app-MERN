const initialState = {
  taskList: "",
  today: 0,
  scheduled: 0,
  clickedTaskList: "",
  clickedListId: "",
  clickedTask: "",
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  //action has the coming data init
  switch (type) {
    case "CLICKED_TASK":
      return {
        ...state,
        clickedTask: payload,
      };
    case "UNCLICKED_TASK":
      return {
        ...state,
        clickedTask: "",
      };
    case "STATUS_CHANGE":
      const statusChangedTasklist = state.taskList.map((list) => {
        if (list._id === payload.listId) {
          const newList = {
            _id: list._id,
            user: list.user,
            listName: list.listName,
            taskList: payload.data,
          };
          return newList;
        }
        return list;
      });
      const newTaskStatusChanged = {
        label: state.clickedTaskList.label,
        displayTask: payload.data,
      };
      return {
        ...state,
        taskList: statusChangedTasklist,
        clickedTaskList: newTaskStatusChanged,
      };
    case "UPDATE_CLICKEDTASKLIST":
      const newCheckList = {
        label: state.clickedTaskList.label,
        displayTask: payload,
      };
      return {
        ...state,
        clickedTaskList: newCheckList,
      };
    case "ADD_TASK":
      const newData = state.taskList.map((list) => {
        if (list._id === payload.listId) {
          const newList = {
            _id: list._id,
            user: list.user,
            listName: list.listName,
            taskList: payload.data,
          };
          return newList;
        }
        return list;
      });
      return {
        ...state,
        taskList: newData,
      };

    case "REMOVE_TASK":
      const removedTaskList = state.taskList.map((list) => {
        if (list._id === payload.listId) {
          const updatedTasklist = list.taskList.filter(
            (task) => task._id !== payload.taskId
          );
          const tempList = {
            _id: list._id,
            user: list.user,
            listName: list.listName,
            taskList: updatedTasklist,
          };
          return tempList;
        }
        return list;
      });

      if (state.clickedListId === payload.listId) {
        const updateclickedList = removedTaskList.filter(
          (list) => list._id === payload.listId
        );
        const changeCheckList = {
          label: updateclickedList[0].listName,
          displayTask: updateclickedList[0].taskList,
        };
        return {
          ...state,
          clickedTaskList: changeCheckList,
          taskList: removedTaskList,
        };
      } else
        return {
          ...state,
          taskList: removedTaskList,
        };
    case "LOAD_CLICKED_LIST_TASK":
      return {
        ...state,
        clickedTaskList: payload,
      };
    case "CLICKED":
      return {
        ...state,
        clickedListId: payload,
      };
    case "UNCLICKED":
      return {
        ...state,
        clickedListId: "",
      };
    case "SET_NUMBERS":
      return {
        ...state,
        today: payload.td,
        scheduled: payload.sd,
      };
    case "GET_All_TASKS":
      return {
        ...state,
        taskList: payload,
      };
    case "CLEAR_TASK":
      return {
        ...state,
        taskList: null,
      };
    //ADD to redux LIST
    case "ADD_LIST":
      let newTaskList = state.taskList.concat(payload);
      return {
        ...state,
        taskList: newTaskList,
      };

    //Remove from redux list
    case "REMOVE_LIST":
      let deletedTaskList = state.taskList.filter(
        (list) => list._id !== payload
      );
      return {
        ...state,
        taskList: deletedTaskList,
      };

    default:
      return state;
  }
}
