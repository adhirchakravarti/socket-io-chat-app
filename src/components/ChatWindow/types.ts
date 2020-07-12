import {CREATE_CONNECTION, SEND_MESSAGE, RECEIVE_MESSAGE} from "./constants";

// export type Socket = {
//     connected: boolean;
//     id: string;
// };

export enum marginType {
    normal = "normal",
    dense = "dense"
}

export enum inputSize {
    medium = "medium",
    small = "small"
}

export enum inputVariant {
    outlined = "outlined",
    standard = "standard",
    filled = "filled"
}

export type Socket = SocketIO.Socket;

export interface ChatState {
    messages: Message[];
    userName: string;
}

export interface Message {
    id: string;
    sender: string;
    text: string;
    time: number;
}

export type user = {
    socketId: string;
    name: string;
    joined: number;
};

interface CreateConnectionAction {
    type: typeof CREATE_CONNECTION;
}

interface SendMessageAction {
    type: typeof SEND_MESSAGE;
    payload: {
        message: Message;
    };
}

interface ReceiveMessageAction {
    type: typeof RECEIVE_MESSAGE;
    payload: {
        message: Message;
    };
}

export type ChatActionTypes = CreateConnectionAction | SendMessageAction | ReceiveMessageAction;
