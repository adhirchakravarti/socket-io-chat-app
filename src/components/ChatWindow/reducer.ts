import {original, produce, setAutoFreeze} from "immer";
setAutoFreeze(false);
import io from "socket.io-client";

import {
    CREATE_CONNECTION,
    CLOSE_CONNECTION,
    SEND_MESSAGE,
    RECEIVE_MESSAGE,
    SERVER_URL,
    SET_USERNAME
} from "./constants";
import {ChatState, ChatActionTypes, Message} from "./types";
import {Reducer} from "react";

export const initialState: ChatState = {
    messages: [],
    socket: null,
    userName: ""
};

const chatReducer: Reducer<ChatState, ChatActionTypes> = produce((draft, action) => {
    switch (action.type) {
        case CREATE_CONNECTION: {
            const socket = io(SERVER_URL, {forceNew: true});
            draft.socket = socket;
            break;
        }

        case SET_USERNAME: {
            const {userName} = action.payload;
            draft.userName = userName;
            break;
        }

        case CLOSE_CONNECTION: {
            console.log(action.payload);
            const {socket} = original(draft);
            const newSocket = socket.close();
            draft.socket = newSocket;
            break;
        }

        case SEND_MESSAGE: {
            console.log(action.payload);
            break;
        }

        case RECEIVE_MESSAGE: {
            console.log(action.payload, original(draft));
            const {message} = action.payload;
            const {messages: existingMessages} = original(draft);
            const messageIndex = existingMessages.findIndex(
                (msg: Message) => msg.id === message.id
            );
            if (messageIndex < 0) {
                existingMessages.push(message);
            }
            draft.messages = [...existingMessages];
            break;
        }
    }
}, initialState);

export default chatReducer;
