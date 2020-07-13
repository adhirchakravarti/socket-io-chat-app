const port = process.env.PORT || 3002;
const express = require("express");
const app = express();
const server = app.listen(port, cback);
const io = require("socket.io").listen(server);
const {v4: uuidv4} = require("uuid");

const userServ = require("./users.ts");
console.log(userServ.addNewUser);
const msgServ = require("./messages.ts");

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
    console.log("connection!!", socket.id, socket.handshake.time);
    const user = userServ.addNewUser(socket);
    console.log(user, userServ.getUsers());
    // socket.emit("welcome", user);
    socket.emit("action", {type: "chatClient/SET_USERNAME_SUCCESS", payload: {userName: user}});
    socket.emit("action", {type: "chatClient/SOCKET_ID", payload: {socketId: socket.id}});
    const joinNotificationMessage = createMessage(`${user} has joined the chat!`);
    // socket.broadcast.emit("broadcast", joinNotificationMessage);
    io.emit("action", {
        type: "chatClient/RECEIVE_MESSAGE",
        payload: {message: joinNotificationMessage}
    });

    socket.on("chat message", function (msg) {
        console.log(msg);
        const added = msgServ.addMessage(msg);
        console.log(added);
        io.emit("message", msg); // perhaps should be socket.broadcast.emit()?
    });

    socket.on("disconnect", (reason) => {
        console.log("reason for disconnect = ", reason);
        if (disconnectReasons.client.includes(reason)) {
            const response = userServ.removeUser(socket.id);
            console.log(response);
            const msg = createMessage(response);
            socket.broadcast.emit("broadcast", msg);
        } else if (disconnectReasons.server.includes(reason)) {
            // manually reconnect
        }
    });

    socket.on("action", (action) => {
        if (action.type === "chatServer/hello") {
            console.log("Got hello data!", action.data);
            socket.emit("action", {type: "message", data: "good day!"});
        } else if (action.type === "chatServer/SET_USERNAME") {
            const {userName} = action.payload;
            console.log(userName, user, socket.id, userServ.getUsers());
            userServ
                .changeUserName(socket.id, userName)
                .then((response) => {
                    if (response === "success") {
                        socket.emit("action", {
                            type: "chatClient/SET_USERNAME_SUCCESS",
                            payload: {userName: userName}
                        });
                        const nameChangeNotification = createMessage(
                            `${user} is now called ${userName}`
                        );
                        io.emit("action", {
                            type: "chatClient/RECEIVE_MESSAGE",
                            payload: {message: nameChangeNotification}
                        });
                    }
                })
                .catch((reason) => {
                    console.log(reason);
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

// console.log(server);
function cback() {
    console.log(`server running at port ${port}`);
}
