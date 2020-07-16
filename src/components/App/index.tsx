import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";

import Box from "@material-ui/core/Box";
import MailIcon from "@material-ui/icons/Mail";
import SettingsIcon from "@material-ui/icons/Settings";

import {ThemeProvider, makeStyles, createStyles} from "@material-ui/core/styles";
import GlobalResponsiveFont from "../../globalResponsiveFont";
import CssBaseline from "@material-ui/core/CssBaseline";
import useWindowHeight from "../../utils/useWindowHeight";

import Header from "../Header";
import UserSettings from "../UserSettings";
import ChatWindow from "../ChatWindow";
import TabPanel from "../TabPanel";
import BadgeIcon from "../BadgeIcon";
import {lightTheme, darkTheme} from "../../theme";
import {useMediaQuery} from "react-responsive";

const useStyles = makeStyles(() =>
    createStyles({
        gridContainer: {
            maxHeight: (props: {height: number}) => {
                return props.height ? props.height : "100%";
            },
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            margin: "0rem",
            "& > *:first-child": {
                marginBottom: "2rem"
            }
        },
        content: {
            maxHeight: "75vh"
        }
    })
);

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
    const {height} = useWindowHeight();
    console.log("window height = ", height);
    const classes = useStyles({height});
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
    const isPortrait = useMediaQuery({query: "(orientation: portrait)"});
    console.log("is Portrait? ", isPortrait);
    return (
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
            <CssBaseline />
            <GlobalResponsiveFont />
            <Router>
                <Switch>
                    <Box className={classes.gridContainer}>
                        <Box>
                            <Header title="Chat-App" />
                            <TabPanel tabs={tabs} />
                        </Box>
                        <Box className={classes.content}>
                            <Route path="/" exact>
                                <Redirect to="/chat" />
                            </Route>
                            <Route
                                path="/chat"
                                render={() => {
                                    return (
                                        <ChatWindow
                                            parentHeight={height}
                                            isPortrait={isPortrait}
                                            maxHeight={73}
                                        />
                                    );
                                }}
                            />
                            <Route
                                path="/settings"
                                render={() => {
                                    return (
                                        <UserSettings
                                            parentHeight={height}
                                            isPortrait={isPortrait}
                                        />
                                    );
                                }}
                            />
                        </Box>
                    </Box>
                </Switch>
            </Router>
        </ThemeProvider>
    );
}

export default connect(mapStateToProps, null)(App);
