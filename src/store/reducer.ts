import {original, produce, setAutoFreeze} from "immer";
setAutoFreeze(false);

import {
    SET_USERNAME_SUCCESS,
    RECEIVE_MESSAGE,
    SOCKET_ID,
    CHANGE_SETTINGS,
    RESET_SETTINGS,
    UNREAD_MESSAGE,
    RESET_UNREAD_MESSAGE_COUNT
} from "./chatServerConstants";
import {ChatState, Message} from "../types/index";
import {ChatServerActionTypes} from "./chatServerActions";
import {Reducer} from "react";

export const initialState: ChatState = {
    messages: [],
    userName: "",
    socketId: "",
    theme: "light",
    clock: "24",
    sendMessageOnCtrlEnter: "false",
    unreadMessageCount: 0
};

const chatReducer: Reducer<ChatState, ChatServerActionTypes> = produce((draft, action) => {
    switch (action.type) {
        case SOCKET_ID: {
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

        case CHANGE_SETTINGS: {
            const {
                settings: {userName, theme, clock, sendMessageOnCtrlEnter}
            } = action.payload;
            draft.userName = userName;
            draft.theme = theme;
            draft.clock = clock;
            draft.sendMessageOnCtrlEnter = sendMessageOnCtrlEnter;
            break;
        }

        case RESET_SETTINGS: {
            draft.userName = original(draft).userName;
            draft.theme = "light";
            draft.clock = "24";
            draft.sendMessageOnCtrlEnter = "false";
            break;
        }

        case UNREAD_MESSAGE: {
            let unreadMessageCount = original(draft).unreadMessageCount;
            unreadMessageCount += 1;
            draft.unreadMessageCount = unreadMessageCount;
            break;
        }

        case RESET_UNREAD_MESSAGE_COUNT: {
            draft.unreadMessageCount = 0;
            break;
        }
    }
}, initialState);

export default chatReducer;
