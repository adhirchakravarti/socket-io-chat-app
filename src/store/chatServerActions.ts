import {Message, Settings} from "../types/index";
import {
    SEND_MESSAGE,
    SET_USERNAME,
    RECEIVE_MESSAGE,
    GET_INITIAL_USERNAME,
    SET_THEME,
    CHANGE_SETTINGS,
    RESET_SETTINGS,
    UNREAD_MESSAGE,
    RESET_UNREAD_MESSAGE_COUNT
} from "./chatServerConstants";

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

interface SetUsernameAction {
    type: typeof SET_USERNAME;
    payload: {
        userName: string;
    };
}

interface GetInitialUserNameAction {
    type: typeof GET_INITIAL_USERNAME;
}

interface SetThemeAction {
    type: typeof SET_THEME;
    payload: {
        theme: string;
    };
}

interface ChangeSettingsAction {
    type: typeof CHANGE_SETTINGS;
    payload: {
        settings: Settings;
    };
}

interface ResetSettingsAction {
    type: typeof RESET_SETTINGS;
}

interface UnreadMessageAction {
    type: typeof UNREAD_MESSAGE;
}

interface ResetUnreadMessageCountAction {
    type: typeof RESET_UNREAD_MESSAGE_COUNT;
}

export function sendMessage(message: Message): SendMessageAction {
    return {
        type: SEND_MESSAGE,
        payload: {
            message
        }
    };
}

export function receiveMessage(message: Message): ReceiveMessageAction {
    return {
        type: RECEIVE_MESSAGE,
        payload: {
            message
        }
    };
}

export function setUsername(userName: string): SetUsernameAction {
    return {
        type: SET_USERNAME,
        payload: {
            userName
        }
    };
}

export function getInitialUserName(): GetInitialUserNameAction {
    return {
        type: GET_INITIAL_USERNAME
    };
}

export function setTheme(theme: string): SetThemeAction {
    return {
        type: SET_THEME,
        payload: {
            theme
        }
    };
}

export function changeSettings(settings: Settings): ChangeSettingsAction {
    return {
        type: CHANGE_SETTINGS,
        payload: {
            settings
        }
    };
}

export function resetSettings(): ResetSettingsAction {
    return {
        type: RESET_SETTINGS
    };
}

export function unreadMessage(): UnreadMessageAction {
    return {
        type: UNREAD_MESSAGE
    };
}

export function resetUnreadMessageCount(): ResetUnreadMessageCountAction {
    return {
        type: RESET_UNREAD_MESSAGE_COUNT
    };
}

export type ChatServerActionTypes =
    | SendMessageAction
    | ReceiveMessageAction
    | SetUsernameAction
    | GetInitialUserNameAction
    | SetThemeAction
    | ChangeSettingsAction
    | ResetSettingsAction
    | UnreadMessageAction
    | ResetUnreadMessageCountAction;
