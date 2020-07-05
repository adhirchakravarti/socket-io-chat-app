import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import Chat from "../Chat";
import UserSettings from "../UserSettings";

function App(): JSX.Element {
    return (
        <Router>
            <h1>App Component!</h1>
            <Chat />
            <UserSettings />
        </Router>
    );
}

export default App;
