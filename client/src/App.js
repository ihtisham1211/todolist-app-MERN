import "./App.css";
import React, {useEffect} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
//redux
import {Provider} from "react-redux";
import store from "./store";
import Body from "./components/Body";
import setAuthToken from "./utils/setAuthToken";
import {loadUser} from "./actions/auth";
import Login from "./components/Login";
import PrivateRoute from "./components/routering/PrivateRoute";
import Register from "./components/Register";

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

function App() {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);
    return (
        <div className="App">
            <Provider store={store}>
                <Router>
                    <Route exact path="/" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Switch>
                        <PrivateRoute exact path="/todolist" component={Body}/>
                    </Switch>
                </Router>
            </Provider>
        </div>
    );
}

export default App;
