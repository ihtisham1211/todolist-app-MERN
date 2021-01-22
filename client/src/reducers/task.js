const initialState = {
  taskList: "",
  today: 0,
  scheduled: 0,
  clickedTaskList: "",
  clickedListId: "",
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  //action has the coming data init
  switch (type) {
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
      let newList = {
        _id: "",
        user: "",
        listName: payload,
        taskList: [],
      };
      let newTaskList = state.taskList.concat(newList);
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

    case "ADD_TASK":
      let newTask = {
        _id: "",
        date: payload.date,
        title: payload.title,
        description: payload.description,
        status: payload.status,
      };

      // const newAddTaskList = state.taskList.map((list) => {
      //   if (list._id === payload.listId) {
      //     list.taskList.concat(newTask);
      //   }
      //   return list;
      // });

      const newAddTaskList = state.clickedTaskList.displayTask.concat(newTask);
      const newTaskList3 = {
        label: state.clickedTaskList.label,
        displayTask: newAddTaskList,
      };
      return {
        ...state,
        clickedTaskList: newTaskList3,
      };

    case "REMOVE_TASK":
      // const newDeleteTaskList = state.taskList.map((list) => {
      //   if (list._id === payload.listId) {
      //     const i = list.taskList.filter((task) => task._id !== payload.taskId);
      //
      //     const cList = {
      //       _id: list._id,
      //       user: list.user,
      //       listName: list.listName,
      //       taskList: i,
      //     };
      //     return cList;
      //   } else return list;
      // });

      const newDeleteTaskList2 = state.clickedTaskList.displayTask.filter(
        (task) => task._id !== payload.taskId
      );
      const newTaskList2 = {
        label: state.clickedTaskList.label,
        displayTask: newDeleteTaskList2,
      };
      return {
        ...state,
        // taskList: newDeleteTaskList,
        clickedTaskList: newTaskList2,
      };
    default:
      return state;
  }
}
