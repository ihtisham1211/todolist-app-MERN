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
import PrivateRoute from "./components/routering/PrivateRoute";
import DisplayTasks from "./components/DisplayTasks";
import Addlistmodel from "./components/Addlistmodel";
import AddReminderModel from "./components/AddReminderModel";
import TodayTask from "./components/TodayTask";
import ScheduledTask from "./components/ScheduledTask";
import EditTask from "./components/EditTask";

function App() {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    } else store.dispatch(loadUser());
  }, []);

  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Route exact path="/" component={Login} />
          <Route path="/register" component={Register} />
          <Switch>
            <PrivateRoute path="/todolist" component={Body} />
            <PrivateRoute path="/displaytask" component={DisplayTasks} />
            <PrivateRoute path="/addlist" component={Addlistmodel} />
            <PrivateRoute path="/addrem" component={AddReminderModel} />
            <PrivateRoute path="/today" component={TodayTask} />
            <PrivateRoute path="/scheduled" component={ScheduledTask} />
            <PrivateRoute path="/edittask" component={EditTask} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
