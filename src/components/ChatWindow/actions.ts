import {CREATE_CONNECTION, RECEIVE_MESSAGE, SET_USERNAME} from "./constants";
import {ChatActionTypes, Message} from "./types";

export function createConnection(): ChatActionTypes {
    return {
        type: CREATE_CONNECTION
    };
}

export function receiveMessage(message: Message): ChatActionTypes {
    return {
        type: RECEIVE_MESSAGE,
        payload: {
            message
        }
    };
}

export function setUserName(userName: string): ChatActionTypes {
    return {
        type: SET_USERNAME,
        payload: {
            userName
        }
    };
}
