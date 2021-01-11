const initialState = {created: false,
    theme: true,
    name: localStorage.getItem('name'),
    image: localStorage.getItem('image')};

export default function (state = initialState, action) {
    const {type} = action;
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
        case "SET_NAME_AND_IMAGE":
            return {
                ...state,
                name: localStorage.getItem('name'),
                 image: localStorage.getItem('image'),
            };
        default:
            return state;
    }
}
