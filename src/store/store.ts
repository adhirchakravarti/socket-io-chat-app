import {createStore, combineReducers, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import createSocketIoMiddleware from "redux-socket.io";
import {SERVER_URL} from "./constants";
import chatReducer from "./reducer";
import io from "socket.io-client";

const socket = io(SERVER_URL);
const socketIoMiddleware = createSocketIoMiddleware(socket, "chatServer/");
const middleWares = [socketIoMiddleware];

const rootReducer = combineReducers({
    chatReducer
});
const enhancer = composeWithDevTools(applyMiddleware(...middleWares));

const store = createStore(rootReducer, enhancer);

const savedSettings = JSON.parse(sessionStorage.getItem("settings"));
if (savedSettings && Object.keys(savedSettings).length > 0) {
    const savedUserName = savedSettings.userName;
    store.dispatch({type: "chatClient/LOAD_SETTINGS"});
    setTimeout(
        () => store.dispatch({type: "chatServer/SET_USERNAME", payload: {userName: savedUserName}}),
        1000
    );
}

export default store;
