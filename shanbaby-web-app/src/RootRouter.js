import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import indexRoutes from "./routes/index";
import adminRoutes from "./routes/adminroutes";
import loginUserRoutes from "./routes/loginUser";

class App extends React.Component {
  router = () => {
    let routes = indexRoutes;

    let checkSignedIn = this.props.auth.isAuthenticated;
    let role = checkSignedIn ? this.props.auth.user.type : "";

    if (checkSignedIn === true) {
      routes = [...loginUserRoutes, ...routes];
    }

    if (checkSignedIn === true && role === "admin") {
      routes = [...adminRoutes, ...routes];
    }

    return routes;
  };

  render() {
    return (
      <Router>
        <Switch>
          {this.router().map((prop, key) => {
            return (
              <Route
                path={prop.path}
                key={key}
                component={(props) => <prop.component {...props} />}
                exact={prop.exact ? true : false}
              />
            );
          })}
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth || {},
});

export default connect(mapStateToProps)(App);
