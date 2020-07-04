import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { useSelector } from "react-redux";

import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";
import Login from "./pages/login";
import Register from "./pages/register";
import Logout from "./pages/logout";
import CreateServer from "./pages/dashboard/createServer";
import Server from "./pages/server";
import FindServer from "./pages/findserver";

const Routes = () => {
    const isUser = useSelector((state) => (state.user.profile ? true : false));

    if (isUser) {
        return (
            <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/logout" component={Logout} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/createserver" component={CreateServer} />
                <Route exact path="/server/:id" component={Server} />
                <Route exact path="/findserver" component={FindServer} />
                <Redirect to="/" />
            </Switch>
        );
    } else {
        return (
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Redirect to="/login" />
            </Switch>
        );
    }
};

export default Routes;
