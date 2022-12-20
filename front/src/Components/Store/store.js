import {legacy_createStore,applyMiddleware,combineReducers} from "redux";
import thunk from "redux-thunk";
import { userReducer } from "./user/user.reducer";

let rootReducer = combineReducers({
    user:userReducer,
})

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk));