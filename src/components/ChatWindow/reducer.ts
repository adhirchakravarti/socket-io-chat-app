import {original, produce, setAutoFreeze} from "immer";
setAutoFreeze(false);

import {SET_USERNAME_SUCCESS, RECEIVE_MESSAGE, SOCKET_ID} from "./chatServerConstants";
import {ChatState, ChatActionTypes, Message} from "./types";
import {Reducer} from "react";

export const initialState: ChatState = {
    messages: [],
    userName: "",
    socketId: "",
    theme: ""
};

const chatReducer: Reducer<ChatState, ChatActionTypes> = produce((draft, action) => {
    switch (action.type) {
        case SOCKET_ID: {
            console.log(action);
            const {socketId} = action.payload;
            draft.socketId = socketId;
            break;
        }

        case SET_USERNAME_SUCCESS: {
            const {userName} = action.payload;
            draft.userName = userName;
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
