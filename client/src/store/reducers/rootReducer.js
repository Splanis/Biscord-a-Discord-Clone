import { combineReducers } from "redux";

import { userReducer } from "./userReducer";
import { serverReducer } from "./serverReducer";

const rootReducer = combineReducers({
    user: userReducer,
    servers: serverReducer,
});

export default rootReducer;
