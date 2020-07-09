// const userType = require("../src/components/ChatWindow/types");
// console.log(userType);

class UserService {
    users = [];

    generateUserName() {
        const userNum = Math.round(Math.random() * 1000);
        const userName = `user${userNum}`;
        return userName;
    }

    getUsers() {
        return this.users;
    }

    addNewUser(socket) {
        const createdUser = this.generateUserName();
        const userIndex = this.users.findIndex((user) => user.name === createdUser);
        if (userIndex >= 0) {
            this.addNewUser(socket);
        } else {
            this.users.push({
                socketId: socket.id,
                name: createdUser,
                joined: new Date(socket.handshake.time).getTime()
            });
        }
        return createdUser;
    }

    removeUser(socketId) {
        const userIndex = this.users.findIndex((user) => user.socketId === socketId);
        if (userIndex >= 0) {
            this.users.splice(userIndex, 1);
            return `User with socketId ${socketId} deleted`;
        }
        return `User with socketId ${socketId} not found`;
    }
}

module.exports = new UserService();
