import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import statsReducer from "./statsReducer";
import logsReducer from "./logsReducer";
import logsHistoryReducer from "./logsHistoryReducer";

export default combineReducers({
	auth: authReducer,
	stats: statsReducer,
	logs: logsReducer,
	logsHistory: logsHistoryReducer,
	form: reduxForm,
});
