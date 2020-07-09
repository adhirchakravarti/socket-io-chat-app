class MessageService {
    messages = [];

    addMessage(newMessage) {
        const messageIndex = this.messages.findIndex((message) => message.id === newMessage.id);
        if (messageIndex < 0) {
            this.messages.push(newMessage);
            return "Message added successfully!";
        }
        return "Message not added!";
    }

    getMessages(userJoinTime) {
        return this.messages.filter((message) => message.time >= userJoinTime);
    }

    getMessage(messageId) {
        const messageIndex = this.messages.findIndex((message) => message.id === messageId);
        if (messageIndex >= 0) {
            return this.messages[messageIndex];
        }
        return "Message Not Found!";
    }
}

module.exports = new MessageService();
