import {createStore, combineReducers, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import createSocketIoMiddleware from "redux-socket.io";
import {SERVER_URL} from "./constants";
import chatReducer from "./reducer";
import io from "socket.io-client";

const socket = io(SERVER_URL);
const socketIoMiddleware = createSocketIoMiddleware(socket, "chatServer/");
const middleWares = [socketIoMiddleware];
// import {initialState} from "./reducer";

// function reducer(state = {}, action) {
//     switch (action.type) {
//         case "message":
//             return Object.assign({}, {message: action.data});
//         default:
//             return state;
//     }
// }

const rootReducer = combineReducers({
    chatReducer
});
const enhancer = composeWithDevTools(applyMiddleware(...middleWares));

const store = createStore(rootReducer, enhancer);

store.subscribe(() => {
    console.log("new client state", store.getState());
});
// store.dispatch({type: "chatServer/hello", data: "Hello!"});
setTimeout(() => {
    store.dispatch({type: "chatServer/SET_USERNAME", payload: {userName: "Jack"}});
}, 20000);

export default store;
