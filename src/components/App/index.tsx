import React from "react";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import GlobalResponsiveFont from "../../globalResponsiveFont";
import Chat from "../Chat";
import UserSettings from "../UserSettings";
import {v4 as uuidv4} from "uuid";

function App(): JSX.Element {
    console.log(uuidv4());
    return (
        <Router>
            <CssBaseline />
            <GlobalResponsiveFont />
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
