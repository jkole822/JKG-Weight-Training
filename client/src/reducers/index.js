import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import statsReducer from "./statsReducer";
import logsReducer from "./logsReducer";

export default combineReducers({
	auth: authReducer,
	stats: statsReducer,
	logs: logsReducer,
	form: reduxForm,
});
