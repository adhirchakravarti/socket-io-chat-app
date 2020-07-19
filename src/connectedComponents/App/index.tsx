import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {Dispatch} from "redux";

import Box from "@material-ui/core/Box";
import MailIcon from "@material-ui/icons/Mail";
import SettingsIcon from "@material-ui/icons/Settings";

import {ThemeProvider, makeStyles, createStyles} from "@material-ui/core/styles";
import GlobalResponsiveFont from "../../globalResponsiveFont";
import CssBaseline from "@material-ui/core/CssBaseline";
import useWindowHeight from "../../utils/useWindowHeight";

import Header from "../../components/Header";
import UserSettings from "../UserSettings";
import ChatWindow from "../ChatWindow";
import TabPanel from "../../components/TabPanel";
import BadgeIcon from "../../components/BadgeIcon";
import {lightTheme, darkTheme} from "../../theme";
import {useMediaQuery} from "react-responsive";
import {loadSettings} from "../../store/actions";

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
    return {
        socketId: state.chatReducer.socketId,
        theme: state.chatReducer.theme,
        unreadMessageCount: state.chatReducer.unreadMessageCount
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadSettingsAction: () => dispatch(loadSettings())
    };
};

interface AppProps {
    socketId: string;
    theme: string;
    unreadMessageCount: number;
    loadSettingsAction: () => Dispatch;
}

function App({
    socketId,
    theme,
    unreadMessageCount,
    loadSettingsAction
}: AppProps): React.FunctionComponentElement<AppProps> {
    const [visible, setVisible] = useState(true);
    const {height} = useWindowHeight();
    const classes = useStyles({height});
    const isPortrait = useMediaQuery({query: "(orientation: portrait)"});
    const makeVisible = () => {
        setVisible((prevState) => !prevState);
    };
    useEffect(() => {
        if (socketId) {
            const savedSettings = JSON.parse(sessionStorage.getItem("settings"));
            if (savedSettings && Object.keys(savedSettings).length > 0) {
                loadSettingsAction();
            }
        }
    }, [socketId]);
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
                <Box className={classes.gridContainer}>
                    <Box>
                        <Header title="Chat-App" />
                        <TabPanel tabs={tabs} />
                    </Box>
                    <Box className={classes.content}>
                        <Switch>
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
                        </Switch>
                    </Box>
                </Box>
            </Router>
        </ThemeProvider>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
