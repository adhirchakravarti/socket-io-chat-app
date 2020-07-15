import {createStore, combineReducers, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import createSocketIoMiddleware from "redux-socket.io";
import {SERVER_URL} from "./chatServerConstants";
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

export default store;
