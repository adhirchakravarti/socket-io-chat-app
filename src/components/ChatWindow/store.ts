import {createStore, combineReducers} from "redux";
import {devToolsEnhancer} from "redux-devtools-extension";
import chatReducer from "./reducer";
// import {initialState} from "./reducer";

const rootReducer = combineReducers({
    chatReducer
});

const store = createStore(rootReducer, devToolsEnhancer({}));

export default store;
