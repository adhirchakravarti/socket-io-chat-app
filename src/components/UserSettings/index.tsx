import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import {marginType, inputSize, inputVariant, Settings, Message} from "../../types/index";
import {makeStyles, Theme, createStyles} from "@material-ui/core/styles";
import TextInput from "../TextInput";
import {
    setUsername,
    changeSettings,
    resetSettings,
    unreadMessage
} from "../../store/chatServerActions";
import FormRadioGroup from "../FormRadioGroup";
import {Dispatch} from "redux";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
            backgroundColor: theme.palette.background.paper
        },
        contentContainer: {
            display: "flex",
            flexDirection: "column",
            flexGrow: 1
        },
        listContainer: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flexGrow: 1,
            padding: "2rem"
        },
        form: {
            display: "flex",
            flexDirection: "column",
            flexGrow: 1
        },
        formControl: {
            margin: theme.spacing(3),
            display: "flex",
            flexGrow: 1
        },
        buttonContainer: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: theme.spacing(3),
            flexGrow: 1,
            "& > * + *": {
                marginLeft: "2rem"
            },
            "@media (max-width: 300px)": {
                flexDirection: "column",
                "& > * + *": {
                    marginTop: "2rem",
                    marginLeft: "0rem"
                }
            }
        }
    })
);

const mapStateToProps = (state) => {
    console.log("State at UserSettings = ", state);
    return {
        userName: state.chatReducer.userName,
        theme: state.chatReducer.theme,
        clock: state.chatReducer.clock,
        sendMessageOnCtrlEnter: state.chatReducer.sendMessageOnCtrlEnter,
        messages: state.chatReducer.messages
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUsernameAction: (userName: string) => dispatch(setUsername(userName)),
        changeSettingsAction: (settings: Settings) => dispatch(changeSettings(settings)),
        resetSettingsAction: () => dispatch(resetSettings()),
        unreadMessageAction: () => dispatch(unreadMessage())
    };
};

interface UserSettingsProps {
    userName: string;
    theme: string;
    clock: string;
    sendMessageOnCtrlEnter: string;
    messages: Message[];
    setUsernameAction: (userName: string) => Dispatch;
    changeSettingsAction: (settings: Settings) => Dispatch;
    resetSettingsAction: () => Dispatch;
    unreadMessageAction: () => Dispatch;
}

function UserSettings({
    userName,
    theme,
    clock,
    sendMessageOnCtrlEnter,
    messages,
    setUsernameAction,
    changeSettingsAction,
    resetSettingsAction,
    unreadMessageAction
}: UserSettingsProps): React.FunctionComponentElement<UserSettingsProps> {
    const classes = useStyles();
    const [username, setUsername] = useState(userName);
    const [themeValue, setThemeValue] = useState(theme);
    const [clockValue, setClockValue] = useState(clock);
    const [sendOnCtrlValue, setSendOnCtrlValue] = useState(sendMessageOnCtrlEnter);
    const [messageCount, setMessageCount] = useState(messages.length);

    useEffect(() => {
        setUsername(userName);
    }, [userName]);

    useEffect(() => {
        setThemeValue(theme);
    }, [theme]);

    useEffect(() => {
        setClockValue(clock);
    }, [clock]);

    useEffect(() => {
        setSendOnCtrlValue(sendMessageOnCtrlEnter);
    }, [sendMessageOnCtrlEnter]);

    useEffect(() => {
        const numMessages = messages.length;
        if (numMessages > messageCount) {
            setMessageCount(numMessages);
            unreadMessageAction();
        }
    }, [messages]);

    const handleChangeUserName = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {value} = e.target;
        setUsername(value);
    };

    const handleThemeChange = (value) => {
        setThemeValue(value);
    };

    const handleClockDisplayChange = (value) => {
        setClockValue(value);
    };

    const handleMessageSend = (value) => {
        setSendOnCtrlValue(value);
    };

    const handleResetSettings = () => {
        if (
            themeValue !== theme ||
            clockValue !== clock ||
            sendOnCtrlValue !== sendMessageOnCtrlEnter ||
            username !== userName
        ) {
            setThemeValue(theme);
            setClockValue(clock);
            setSendOnCtrlValue(sendMessageOnCtrlEnter);
            setUsername(userName);
        } else {
            resetSettingsAction();
        }
    };

    const handleFormSubmit = (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();
        if (userName.trim().length < 3 || userName.trim().length > 50) {
            return;
        }
        if (username !== userName) {
            setUsernameAction(username);
        }
        changeSettingsAction({
            userName: username,
            theme: themeValue,
            clock: clockValue,
            sendMessageOnCtrlEnter: sendOnCtrlValue
        });
    };

    return (
        <Container maxWidth="xl" className={classes.root} disableGutters>
            <Paper className={classes.contentContainer} elevation={3}>
                <Box component="div" className={classes.listContainer}>
                    <form className={classes.form} onSubmit={handleFormSubmit}>
                        <FormControl error={false} className={classes.formControl}>
                            <FormLabel color="primary">Username</FormLabel>
                            <TextInput
                                labelText=""
                                placeHolder="3 to 50 characters long"
                                marginType={marginType.normal}
                                inputSize={inputSize.small}
                                inputVariant={inputVariant.outlined}
                                inputValue={username}
                                onInputChange={handleChangeUserName}
                                onKeyPress={() => null}
                            />
                        </FormControl>
                        <FormRadioGroup
                            label="Interface Theme"
                            onChange={handleThemeChange}
                            value={themeValue}
                            radioLabels={["Light", "Dark"]}
                            radioValues={["light", "dark"]}
                        />
                        <FormRadioGroup
                            label="Clock Display"
                            onChange={handleClockDisplayChange}
                            value={clockValue}
                            radioLabels={["12 Hour", "24 Hour"]}
                            radioValues={["12", "24"]}
                        />
                        <FormRadioGroup
                            label="Send Messages on CTRL + Enter"
                            onChange={handleMessageSend}
                            value={sendOnCtrlValue}
                            radioLabels={["On", "Off"]}
                            radioValues={["true", "false"]}
                        />
                        <Box className={classes.buttonContainer}>
                            <Button
                                variant="contained"
                                size="large"
                                color="primary"
                                type="button"
                                onClick={handleResetSettings}
                            >
                                Reset to Defaults
                            </Button>
                            <Button
                                variant="contained"
                                size="large"
                                color="secondary"
                                type="submit"
                            >
                                Save Settings
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Paper>
        </Container>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSettings);
