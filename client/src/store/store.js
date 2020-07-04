import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers/rootReducer";

// Load state from local storage
const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem("state");
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (error) {
        console.log(error);
    }
};

const persistedState = loadFromLocalStorage();

// Creating store
const middleware = applyMiddleware(thunk);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducer,
    persistedState,
    composeEnhancers(middleware)
);

// Save state to local storage
const saveToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("state", serializedState);
    } catch (error) {
        console.log(error);
    }
};

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
