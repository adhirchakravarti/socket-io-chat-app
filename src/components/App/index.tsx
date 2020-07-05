import React from "react";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Chat from "../Chat";
import UserSettings from "../UserSettings";

function App(): JSX.Element {
    return (
        <Router>
            <h1>App Component!</h1>
            <Switch>
                <Route path="/" exact>
                    <Redirect to="/chat" />
                </Route>
                <Route path="/chat" component={Chat} />
                <Route path="/settings" component={UserSettings} />
            </Switch>
        </Router>
    );
}

export default App;
