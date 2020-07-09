import React from "react";
import ReactDOM from "react-dom";
// import {Provider} from "react-redux";
// import store from "./components/ChatWindow/store";
import "./main.scss";

import App from "./components/App";

// ReactDOM.render(
//     <Provider store={store}>
//         <App />
//     </Provider>,
//     document.getElementById("root")
// );

ReactDOM.render(<App />, document.getElementById("root"));
