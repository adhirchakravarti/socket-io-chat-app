import {CREATE_CONNECTION, SEND_MESSAGE, RECEIVE_MESSAGE, SET_USERNAME} from "./constants";

// export type Socket = {
//     connected: boolean;
//     id: string;
// };

export type Socket = SocketIO.Socket;

export interface ChatState {
    messages: Message[];
    socket: Socket;
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

interface SetUserNameAction {
    type: typeof SET_USERNAME;
    payload: {
        userName: string;
    };
}

export type ChatActionTypes =
    | CreateConnectionAction
    | SendMessageAction
    | ReceiveMessageAction
    | SetUserNameAction;
