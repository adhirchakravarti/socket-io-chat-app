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

    getUser(socketId: string) {
        return new Promise((resolve, reject) => {
            const users = [...this.getUsers()];
            const userIndex = users.findIndex((user) => user.socketId === socketId);
            if (userIndex >= 0) {
                resolve(users[userIndex]);
            } else {
                reject();
            }
        });
    }

    addNewUser(socket: SocketIO.Socket) {
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

    changeUserName(socketId: string, newUserName: string) {
        return new Promise((resolve, reject) => {
            const users = [...this.getUsers()];
            const userIndex = users.findIndex((user) => user.socketId === socketId);
            if (userIndex >= 0) {
                const user = users[userIndex];
                user.name = newUserName;
                users.splice(userIndex, 1, user);
                this.users = [...users];
                resolve("success");
            }
            reject("not found");
            // return `user with socketId ${socketId} not found!`;
        });
    }

    removeUser(socketId: string) {
        return new Promise((resolve, reject) => {
            const userIndex = this.users.findIndex((user) => user.socketId === socketId);
            if (userIndex >= 0) {
                const userName = this.users[userIndex].name;
                this.users.splice(userIndex, 1);
                resolve(`User with name ${userName} has left the chat`);
            }
            reject("User not found");
        });
    }
}

module.exports = new UserService();
