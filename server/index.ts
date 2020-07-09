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

const createBroadcastMessage = (text: string) => {
    return {
        id: uuidv4(),
        text: text,
        time: new Date().getTime(),
        sender: "Server"
    };
};

io.on("connection", function (socket) {
    console.log("connection!!", socket.id, socket.handshake.time);
    const user = userServ.addNewUser(socket);
    console.log(user, userServ.getUsers());
    socket.emit("welcome", user);
    const broadcastMessage = createBroadcastMessage(`${user} has joined the chat!`);
    socket.broadcast.emit("broadcast", broadcastMessage);

    socket.on("connected", () => {
        io.emit("congrats");
    });

    socket.on("chat message", function (msg) {
        console.log(msg);
        const added = msgServ.addMessage(msg);
        console.log(added);
        io.emit("message", msg);
    });

    socket.on("disconnect", (reason) => {
        console.log("reason for disconnect = ", reason);
        if (disconnectReasons.client.includes(reason)) {
            const response = userServ.removeUser(socket.id);
            console.log(response);
            const msg = createBroadcastMessage(response);
            socket.broadcast.emit("broadcast", msg);
        } else if (disconnectReasons.server.includes(reason)) {
            // manually reconnect
        }
    });
});

// console.log(server);
function cback() {
    console.log(`server running at port ${port}`);
}
