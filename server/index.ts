const port = process.env.PORT || 3002;
const express = require("express");
const app = express();
const server = app.listen(port, cback);
const io = require("socket.io").listen(server);
const {v4: uuidv4} = require("uuid");

const userServ = require("./users.ts");
// const msgServ = require("./messages.ts"); // something I'd like to use in the future

const disconnectReasons = {
    client: ["client namespace disconnect", "ping timeout", "transport close"],
    server: ["transport error", "server namespace disconnect"]
};

const createMessage = (text: string) => {
    return {
        id: uuidv4(),
        text: text,
        time: new Date().getTime(),
        sender: "Server",
        socketId: ""
    };
};

io.on("connection", function (socket) {
    const createdUserName = userServ.addNewUser(socket);
    socket.emit("action", {type: "chatClient/SOCKET_ID", payload: {socketId: socket.id}});
    socket.emit("action", {
        type: "chatClient/SET_USERNAME_SUCCESS",
        payload: {userName: createdUserName}
    });
    const joinNotificationMessage = createMessage(`${createdUserName} has joined the chat!`);
    io.emit("action", {
        type: "chatClient/RECEIVE_MESSAGE",
        payload: {message: joinNotificationMessage}
    });

    socket.on("disconnect", (reason) => {
        if (disconnectReasons.client.includes(reason)) {
            userServ
                .removeUser(socket.id)
                .then((removeMessage) => {
                    const removeNotification = createMessage(`${removeMessage} due to ${reason}`);
                    io.emit("action", {
                        type: "chatClient/RECEIVE_MESSAGE",
                        payload: {message: removeNotification}
                    });
                })
                .catch((notFoundMessage) => {
                    const removeNotification = createMessage(notFoundMessage);
                    io.emit("action", {
                        type: "chatClient/RECEIVE_MESSAGE",
                        payload: {message: removeNotification}
                    });
                });
        } else if (disconnectReasons.server.includes(reason)) {
            // manually reconnect
        }
    });

    socket.on("action", (action) => {
        if (action.type === "chatServer/hello") {
            socket.emit("action", {type: "message", data: "good day!"});
        } else if (action.type === "chatServer/SET_USERNAME") {
            const {userName} = action.payload;
            userServ
                .changeUserName(socket.id, userName)
                .then((response) => {
                    if (response === "success") {
                        socket.emit("action", {
                            type: "chatClient/SET_USERNAME_SUCCESS",
                            payload: {userName: userName}
                        });
                        const nameChangeNotification = createMessage(
                            `${createdUserName} is now called ${userName}`
                        );
                        io.emit("action", {
                            type: "chatClient/RECEIVE_MESSAGE",
                            payload: {message: nameChangeNotification}
                        });
                    }
                })
                .catch(() => {
                    const newMessage = createMessage("Failed to change username!");
                    socket.emit("action", {
                        type: "chatClient/RECEIVE_MESSAGE",
                        payload: {message: newMessage}
                    });
                });
        } else if (action.type === "chatServer/SEND_MESSAGE") {
            const {message} = action.payload;
            io.emit("action", {
                type: "chatClient/RECEIVE_MESSAGE",
                payload: {message: message}
            });
        }
    });
});

function cback() {
    console.log(`server running at port ${port}`);
}
