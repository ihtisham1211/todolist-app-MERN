const initialState = {
  taskList: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  //action has the coming data init
  switch (type) {
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
    default:
      return state;
  }
}
