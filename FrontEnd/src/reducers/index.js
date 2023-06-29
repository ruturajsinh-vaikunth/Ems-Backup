import { combineReducers } from "redux";
import UserReducers from "./userReducers";
import employeeReducer from "./employee";

export default combineReducers({
    users : UserReducers,
    employee: employeeReducer
});