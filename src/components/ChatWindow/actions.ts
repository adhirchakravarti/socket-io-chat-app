import {CREATE_CONNECTION, RECEIVE_MESSAGE} from "./constants";
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
