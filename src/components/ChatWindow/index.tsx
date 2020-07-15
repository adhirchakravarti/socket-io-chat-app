/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import {connect} from "react-redux";
import {compose, Dispatch} from "redux";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import {v4 as uuidv4} from "uuid";
// import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import {withStyles, Theme, StyleRules} from "@material-ui/core/styles";
import ChatInput from "../ChatInput";
import ChatMessageList from "../ChatMessageList";
import {Message} from "../../types/index";
import {
    sendMessage,
    receiveMessage,
    getInitialUserName,
    resetUnreadMessageCount
} from "../../store/chatServerActions";

const styles = (theme: Theme): StyleRules => ({
    root: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        backgroundColor: theme.palette.background.paper
    },
    chatContainer: {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1
    },
    listContainer: {
        display: "flex",
        height: "67vh",
        [theme.breakpoints.down("md")]: {
            height: "70vh"
        },
        [theme.breakpoints.down("xs")]: {
            height: "72vh"
        }
    },
    input: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "stretch"
    }
});

type ChatWindowClasses = {
    root: string;
    chatContainer: string;
    listContainer: string;
    input: string;
};

type ComponentState = {
    socket: SocketIO.Socket;
    messages: Message[];
    userName: string;
};

interface ChatWindowProps {
    classes: ChatWindowClasses;
    messages: Message[];
    userName: string;
    socketId: string;
    clock: string;
    sendMessageOnCtrlEnter: string;
    getInitialUserName: () => Dispatch;
    sendNewMessage: (message) => Dispatch;
    receiveNewMessage: (message) => Dispatch;
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
        getInitialUserName: () => dispatch(getInitialUserName()),
        sendNewMessage: (message: Message) => dispatch(sendMessage(message)),
        receiveNewMessage: (message: Message) => dispatch(receiveMessage(message)),
        resetUnreadMessageCountAction: () => dispatch(resetUnreadMessageCount())
    };
};

class ChatWindow extends React.Component<ChatWindowProps> {
    state = {
        messages: [],
        userName: ""
    };

    componentDidMount() {
        this.props.resetUnreadMessageCountAction();
    }

    handleInputMessage = (message: string): void => {
        const newMessage = {
            id: uuidv4(),
            text: message,
            sender: this.props.userName,
            socketId: this.props.socketId,
            time: new Date().getTime()
        };
        const {sendNewMessage} = this.props;
        sendNewMessage(newMessage);
    };
    render() {
        const {classes} = this.props;
        return (
            <Container maxWidth="xl" className={classes.root} disableGutters>
                <Paper className={classes.chatContainer} elevation={3}>
                    <Box component="div" className={classes.listContainer}>
                        <ChatMessageList
                            messages={this.props.messages}
                            socketId={this.props.socketId}
                            clock={this.props.clock}
                        />
                    </Box>
                    <Box className={classes.input}>
                        <ChatInput
                            onSubmit={this.handleInputMessage}
                            sendMessageOnCtrlEnter={this.props.sendMessageOnCtrlEnter}
                        />
                    </Box>
                </Paper>
            </Container>
        );
    }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(withStyles(styles)(ChatWindow));
