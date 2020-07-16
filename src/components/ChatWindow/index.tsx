/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect} from "react";
import {connect} from "react-redux";
import {compose, Dispatch} from "redux";
import {v4 as uuidv4} from "uuid";
import {useMediaQuery} from "react-responsive";

import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import {Theme, StyleRules, makeStyles, createStyles} from "@material-ui/core/styles";
import ChatInput from "../ChatInput";
import ChatMessageList from "../ChatMessageList";
import {Message} from "../../types/index";
import {sendMessage, resetUnreadMessageCount} from "../../store/chatServerActions";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
            backgroundColor: theme.palette.background.paper
        },
        chatContainer: (props: {
            parentHeight: number;
            isPortrait: boolean;
            isTabletOrMobileDevice: boolean;
            maxHeight: number;
        }) => {
            const {parentHeight, maxHeight} = props;
            return {
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                maxHeight: maxHeight ? ((maxHeight + 10) / 100) * parentHeight : "inherit"
            };
        },
        listContainer: {
            display: "flex",
            height: (props: {
                parentHeight: number;
                isPortrait: boolean;
                isTabletOrMobileDevice: boolean;
            }) => {
                const {parentHeight, isPortrait, isTabletOrMobileDevice} = props;
                if (isTabletOrMobileDevice) {
                    if (parentHeight && isPortrait) {
                        return parentHeight * 0.65;
                    } else if (parentHeight && !isPortrait) {
                        return parentHeight * 0.35;
                    }
                } else {
                    if (parentHeight && isPortrait) {
                        return parentHeight * 0.7;
                    } else if (parentHeight && !isPortrait) {
                        return parentHeight * 0.65;
                    }
                }
            }
        },
        input: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "stretch"
        }
    })
);

type ComponentState = {
    socket: SocketIO.Socket;
    messages: Message[];
    userName: string;
};

interface ChatWindowProps {
    messages: Message[];
    userName: string;
    socketId: string;
    clock: string;
    sendMessageOnCtrlEnter: string;
    parentHeight: number;
    maxHeight: number;
    isPortrait: boolean;
    sendNewMessage: (message) => Dispatch;
    resetUnreadMessageCountAction: () => Dispatch;
}

const mapStateToProps = (state) => {
    console.log("reducer state = ", state);
    return {
        messages: state.chatReducer.messages,
        userName: state.chatReducer.userName,
        socketId: state.chatReducer.socketId,
        clock: state.chatReducer.clock,
        sendMessageOnCtrlEnter: state.chatReducer.sendMessageOnCtrlEnter
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        sendNewMessage: (message: Message) => dispatch(sendMessage(message)),
        resetUnreadMessageCountAction: () => dispatch(resetUnreadMessageCount())
    };
};

function ChatWindow({
    messages,
    userName,
    socketId,
    clock,
    sendMessageOnCtrlEnter,
    parentHeight,
    isPortrait,
    maxHeight,
    sendNewMessage,
    resetUnreadMessageCountAction
}: ChatWindowProps): React.FunctionComponentElement<ChatWindowProps> {
    const isTabletOrMobileDevice = useMediaQuery({maxDeviceWidth: 1224});
    const classes = useStyles({parentHeight, isPortrait, isTabletOrMobileDevice, maxHeight});
    useEffect(() => {
        resetUnreadMessageCountAction();
    }, []);

    const handleInputMessage = (message: string): void => {
        const newMessage = {
            id: uuidv4(),
            text: message,
            sender: userName,
            socketId: socketId,
            time: new Date().getTime()
        };
        sendNewMessage(newMessage);
    };
    return (
        <Paper className={classes.chatContainer} elevation={3}>
            <Box component="div" className={classes.listContainer}>
                <ChatMessageList messages={messages} socketId={socketId} clock={clock} />
            </Box>
            <Box className={classes.input}>
                <ChatInput
                    onSubmit={handleInputMessage}
                    sendMessageOnCtrlEnter={sendMessageOnCtrlEnter}
                />
            </Box>
        </Paper>
    );
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ChatWindow);
