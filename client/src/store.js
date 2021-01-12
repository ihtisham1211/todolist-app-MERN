//Boiler Plate. Must be Made like this always
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import rootReducer from "./reducers";


function saveToLocalStorage(state){
    try {
        const serialState = JSON.stringify(state);
        localStorage.setItem("state",serialState);
    }
    catch (e) {
        console.log(e);
    }
}

function loadFromLocalStorage(){
    try {
        const serialState = localStorage.getItem("state");
        if(serialState === null) return undefined;
        return JSON.parse(serialState);
    }
    catch (e) {
        console.log(e);
        return undefined;
    }
}

const initialState = loadFromLocalStorage();
const middleware = [thunk];
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

store.subscribe(()=> saveToLocalStorage(store.getState()));

export default store;
