import {Message} from "./types";
import {
    SEND_MESSAGE,
    SET_USERNAME,
    RECEIVE_MESSAGE,
    GET_INITIAL_USERNAME
} from "./chatServerConstants";

interface sendMessageAction {
    type: typeof SEND_MESSAGE;
    payload: {
        message: Message;
    };
}

interface receiveMessageAction {
    type: typeof RECEIVE_MESSAGE;
    payload: {
        message: Message;
    };
}

interface setUsernameAction {
    type: typeof SET_USERNAME;
    payload: {
        userName: string;
    };
}

interface getInitialUserNameAction {
    type: typeof GET_INITIAL_USERNAME;
}

export function sendMessage(message: Message): sendMessageAction {
    return {
        type: SEND_MESSAGE,
        payload: {
            message
        }
    };
}

export function receiveMessage(message: Message): receiveMessageAction {
    return {
        type: RECEIVE_MESSAGE,
        payload: {
            message
        }
    };
}

export function setUsername(userName: string): setUsernameAction {
    return {
        type: SET_USERNAME,
        payload: {
            userName
        }
    };
}

export function getInitialUserName(): getInitialUserNameAction {
    return {
        type: GET_INITIAL_USERNAME
    };
}
