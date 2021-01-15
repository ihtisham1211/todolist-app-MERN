import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//redux
import { Provider } from "react-redux";
import store from "./store";
import Body from "./components/Body";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import Login from "./components/Login";
import Register from "./components/Register";
import UserProfile from "./components/UserProfile";

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
          <Route exact path="/" component={Login} />
          <Route path="/register" component={Register} />
          <Switch>
            <Route path="/todolist" component={Body} />
            <Route path="/userprofile" component={UserProfile} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
