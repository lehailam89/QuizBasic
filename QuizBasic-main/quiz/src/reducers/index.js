import { combineReducers } from "redux";
import loginReducer  from "./login";

const allReducers = combineReducers({
    loginReducer,
    //thêm nhiều reducer ở đây
});

export default allReducers;