import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import MailIcon from "@material-ui/icons/Mail";
import SettingsIcon from "@material-ui/icons/Settings";

import {ThemeProvider} from "@material-ui/core/styles";
import GlobalResponsiveFont from "../../globalResponsiveFont";
import CssBaseline from "@material-ui/core/CssBaseline";

import Header from "../Header";
import UserSettings from "../UserSettings";
import ChatWindow from "../ChatWindow";
import TabPanel from "../TabPanel";
import BadgeIcon from "../BadgeIcon";
import {lightTheme, darkTheme} from "../../theme";

const mapStateToProps = (state) => {
    console.log("State at App = ", state);
    return {
        theme: state.chatReducer.theme,
        unreadMessageCount: state.chatReducer.unreadMessageCount
    };
};

interface AppProps {
    theme: string;
    unreadMessageCount: number;
}

function App({theme, unreadMessageCount}: AppProps): React.FunctionComponentElement<AppProps> {
    const [visible, setVisible] = useState(true);
    const makeVisible = () => {
        setVisible((prevState) => !prevState);
    };
    useEffect(() => {
        if (unreadMessageCount > 0) {
            setVisible(false);
        } else {
            setVisible(true);
        }
    }, [unreadMessageCount]);
    useEffect(() => {
        let id;
        if (unreadMessageCount > 0) {
            id = setInterval(makeVisible, 700);
        } else {
            clearInterval(id);
            setVisible(true);
        }
        return () => clearInterval(id);
    }, [visible]);
    const tabs = [
        {
            label: "Chat",
            link: "chat",
            icon: (
                <BadgeIcon
                    content={unreadMessageCount}
                    childIcon={<MailIcon />}
                    visible={visible}
                />
            )
        },
        {label: "Settings", link: "settings", icon: <SettingsIcon />}
    ];
    return (
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
            <CssBaseline />
            <GlobalResponsiveFont />
            <Router>
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
                                <Header title="Chat-App" />
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
