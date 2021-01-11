const initialState = {
    taskList: null,
    userId: localStorage.getItem('id'),
};

export default function (state = initialState, action) {
    const {type, payload} = action;
    //action has the coming data init
    switch (type) {
        case "ADD_USER_ID":
            return {
                ...state,
                userId: payload,
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
        default:
            return state;
    }
}
