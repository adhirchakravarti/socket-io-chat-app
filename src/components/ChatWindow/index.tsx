/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useEffect} from "react";
import {connect, ConnectedProps} from "react-redux";
import {compose, Dispatch} from "redux";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import {v4 as uuidv4} from "uuid";
import io from "socket.io-client";
// import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import {withStyles, Theme, StyleRules} from "@material-ui/core/styles";
import ChatInput from "../ChatInput";
import ChatMessageList from "../ChatMessageList";
import {Message, ChatActionTypes} from "./types";
import {createConnection, receiveMessage, setUserName} from "./actions";

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
        height: "88%"
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
    // messages: Message[];
    // socket: SocketIO.Socket;
    // userName: string;
    // createSocketConnection: () => Dispatch;
    // setNewUserName: (userName) => Dispatch;
    // receiveNewMessage: (message) => Dispatch;
}
// type PropsFromRedux = ConnectedProps<typeof withConnect>;

// const mapStateToProps = (state) => {
//     console.log("reducer state = ", state);
//     return {
//         messages: state.chatReducer.messages,
//         socket: state.chatReducer.socket,
//         userName: state.chatReducer.userName
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         createSocketConnection: () => dispatch(createConnection()),
//         setNewUserName: (userName) => dispatch(setUserName(userName)),
//         receiveNewMessage: (message) => dispatch(receiveMessage(message))
//     };
// };

class ChatWindow extends React.Component<ChatWindowProps> {
    state = {
        socket: null,
        messages: [],
        userName: ""
    };

    messageReceived = (message: Message): void => {
        console.log("message = ", message);
        // const {receiveNewMessage} = this.props;
        // receiveNewMessage(message);
        const existingMessages = [...this.state.messages];
        existingMessages.push(message);
        this.setState(() => {
            return {
                messages: [...existingMessages]
            };
        });
    };

    serverDisconnected = (reason: string): void => {
        if (reason === "io server disconnect") {
            // the disconnection was initiated by the server, you need to reconnect manually
            // socket.connect(); dispatch action to connect
            // const {createSocketConnection} = this.props;
            // createSocketConnection();
        }
    };

    userNameReceived = (userName: string) => {
        console.log("username received = ", userName);
        // const {setNewUserName} = this.props;
        // setNewUserName(userName);
        this.setState(() => ({userName}));
    };

    listen = () => {
        console.log("listening for events!");
        // this.props.socket.on("welcome", (userName) => this.userNameReceived(userName));
        // this.props.socket.on("message", (message) => this.messageReceived(message));
        // this.props.socket.on("broadcast", (message) => this.messageReceived(message));
        // this.props.socket.on("disconnect", (reason) => this.serverDisconnected(reason));
        this.state.socket.on("welcome", (userName) => this.userNameReceived(userName));
        this.state.socket.on("message", (message) => this.messageReceived(message));
        this.state.socket.on("broadcast", (message) => this.messageReceived(message));
        this.state.socket.on("disconnect", (reason) => this.serverDisconnected(reason));
    };

    componentDidMount() {
        // const {createSocketConnection} = this.props;
        // createSocketConnection();
        const socket = io("http://localhost:3002", {forceNew: true});
        console.log("socket = ", socket, socket.id);
        this.setState({socket}, () => this.listen());
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(prevProps, this.props);
        // if (
        //     this.props.socket !== prevProps.socket ||
        //     this.props.socket?.id !== prevProps.socket?.id
        // ) {
        //     this.listen();
        // }
    }

    // componentWillUnmount() {
    //     this.props.socket.close();
    // }

    handleInputMessage = (message: string): void => {
        const newMessage = {
            id: uuidv4(),
            text: message,
            sender: this.state.userName,
            time: new Date().getTime()
        };
        this.state.socket.emit("chat message", newMessage, (response) => {
            console.log("server response to sent message = ", response);
        });
    };
    render() {
        const {classes} = this.props;
        console.log("props at ChatWindow = ", this.props);
        return (
            <Container maxWidth="xl" className={classes.root} disableGutters>
                <Paper className={classes.chatContainer} elevation={3}>
                    <Box component="div" className={classes.listContainer}>
                        <ChatMessageList
                            messages={this.state.messages}
                            userName={this.state.userName}
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

// const withConnect = connect(mapStateToProps, mapDispatchToProps);

// export default compose(withConnect)(withStyles(styles)(ChatWindow));

export default withStyles(styles)(ChatWindow);
