/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useEffect} from "react";
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
import {Message} from "../../Types/index";
import {sendMessage, receiveMessage, getInitialUserName} from "./chatServerActions";

const styles = (theme: Theme): StyleRules => ({
    root: {
        width: "100%",
        height: "82vh",
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        // maxWidth: 300,
        backgroundColor: theme.palette.background.paper
    },
    chatContainer: {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1
    },
    listContainer: {
        display: "flex",
        height: "72vh",
        [theme.breakpoints.down("xs")]: {
            height: "75vh"
        }
    },
    list: {
        width: "100%",
        overflowY: "auto"
    },
    input: {
        display: "flex",
        flexDirection: "row",
        // margin: "2rem",
        justifyContent: "center",
        alignItems: "stretch"
    }
});

type Classes = {
    root: string;
    chatContainer: string;
    listContainer: string;
    list: string;
    input: string;
};

type ComponentState = {
    socket: SocketIO.Socket;
    messages: Message[];
    userName: string;
};

interface ChatWindowProps {
    classes: Classes;
    messages: Message[];
    userName: string;
    socketId: string;
    // setNewUserName: (userName) => Dispatch;
    getInitialUserName: () => Dispatch;
    sendNewMessage: (message) => Dispatch;
    receiveNewMessage: (message) => Dispatch;
}

const mapStateToProps = (state) => {
    console.log("reducer state = ", state);
    return {
        messages: state.chatReducer.messages,
        userName: state.chatReducer.userName,
        socketId: state.chatReducer.socketId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // setNewUserName: (userName) => dispatch(setUserName(userName)),
        getInitialUserName: () => dispatch(getInitialUserName()),
        sendNewMessage: (message: Message) => dispatch(sendMessage(message)),
        receiveNewMessage: (message: Message) => dispatch(receiveMessage(message))
    };
};

class ChatWindow extends React.Component<ChatWindowProps> {
    state = {
        messages: [],
        userName: ""
    };

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
        console.log("props at ChatWindow = ", this.props);
        return (
            <Container maxWidth="xl" className={classes.root} disableGutters>
                <Paper className={classes.chatContainer} elevation={3}>
                    <Box component="div" className={classes.listContainer}>
                        <ChatMessageList
                            messages={this.props.messages}
                            socketId={this.props.socketId}
                        />
                    </Box>
                    <Box className={classes.input}>
                        <ChatInput onSubmit={this.handleInputMessage} />
                    </Box>
                </Paper>
            </Container>
        );
    }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(withStyles(styles)(ChatWindow));
