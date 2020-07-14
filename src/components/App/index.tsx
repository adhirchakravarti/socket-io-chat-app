import React from "react";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import GlobalResponsiveFont from "../../globalResponsiveFont";
import {ThemeProvider} from "@material-ui/core/styles";

import Header from "../Header";
import UserSettings from "../UserSettings";
import ChatWindow from "../ChatWindow";
import TabPanel from "../TabPanel";
import {lightTheme, darkTheme} from "../../theme";
console.log("Themes = ", lightTheme, darkTheme);

const tabs = [
    {label: "Chat", link: "chat"},
    {label: "Settings", link: "settings"}
];

const mapStateToProps = (state) => {
    console.log("State at App = ", state);
    return {
        theme: state.chatReducer.theme
    };
};

interface AppProps {
    theme: string;
}

function App({theme}: AppProps): React.FunctionComponentElement<AppProps> {
    return (
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
            <Router>
                <CssBaseline />
                <GlobalResponsiveFont />
                <Switch>
                    <Container maxWidth="xl">
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="stretch"
                            alignContent="stretch"
                            xl={12}
                            spacing={2}
                        >
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <Header title="Docler Chat App" />
                                <TabPanel tabs={tabs} />
                            </Grid>
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <Route path="/" exact>
                                    <Redirect to="/chat" />
                                </Route>
                                <Route path="/chat" component={ChatWindow} />
                                <Route path="/settings" component={UserSettings} />
                            </Grid>
                        </Grid>
                    </Container>
                </Switch>
            </Router>
        </ThemeProvider>
    );
}

export default connect(mapStateToProps, null)(App);
