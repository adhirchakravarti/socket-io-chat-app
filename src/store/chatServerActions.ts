import {Message, Settings} from "../types/index";
import {
    SEND_MESSAGE,
    SET_USERNAME,
    RECEIVE_MESSAGE,
    GET_INITIAL_USERNAME,
    SET_THEME,
    CHANGE_SETTINGS,
    RESET_SETTINGS
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

interface setThemeAction {
    type: typeof SET_THEME;
    payload: {
        theme: string;
    };
}

interface changeSettingsAction {
    type: typeof CHANGE_SETTINGS;
    payload: {
        settings: Settings;
    };
}

interface resetSettingsAction {
    type: typeof RESET_SETTINGS;
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

export function setTheme(theme: string): setThemeAction {
    return {
        type: SET_THEME,
        payload: {
            theme
        }
    };
}

export function changeSettings(settings: Settings): changeSettingsAction {
    return {
        type: CHANGE_SETTINGS,
        payload: {
            settings
        }
    };
}

export function resetSettings(): resetSettingsAction {
    return {
        type: RESET_SETTINGS
    };
}

export type ChatServerActionTypes =
    | sendMessageAction
    | receiveMessageAction
    | setUsernameAction
    | getInitialUserNameAction
    | setThemeAction
    | changeSettingsAction
    | resetSettingsAction;
