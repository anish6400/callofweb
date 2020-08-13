import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";
import AuthRoute from "./util/AuthRoute";

//redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userAction";

//components
import Navbar from "./components/Navbar";

//pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import axios from "axios";
import user from "./pages/user";

axios.defaults.baseURL =
  "https://us-central1-callofweb-c7300.cloudfunctions.net/api";

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    store.dispatch(getUserData());
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <AuthRoute exact path="/login" component={login} />
              <AuthRoute exact path="/signup" component={signup} />
              <Route exact path="/users/:userHandle" component={user} />
              <Route
                exact
                path="/users/:userHandle/post/:postId"
                component={user}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
