const initialState = {created: false, theme: true, name: ""};

export default function (state = initialState, action) {
    const {type, payload} = action;
    //action has the coming data init
    switch (type) {
        case "CREATED_USER":
            return {
                ...state,
                created: true,
            };
        case "FAILED_USER":
            return {
                ...state,
                created: false,
            };
        case "LIGHT":
            return {
                ...state,
                theme: true,
            };
        case "DARK":
            return {
                ...state,
                theme: false,
            };
        case "SET_NAME":
            return {
                ...state,
                name: payload,
            }
        default:
            return state;
    }
}
