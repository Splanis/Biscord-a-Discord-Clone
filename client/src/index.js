import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import { Provider, useSelector } from "react-redux";
import store from "./store/store.js";

import GlobalTheme from "./components/shared/GlobalTheme";

const root = document.getElementById("root");

ReactDOM.render(
    <Provider store={store}>
        <GlobalTheme />
        <App />
    </Provider>,
    root
);
