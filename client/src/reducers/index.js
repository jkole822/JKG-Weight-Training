import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import statsReducer from "./statsReducer";

export default combineReducers({
	auth: authReducer,
	stats: statsReducer,
	form: reduxForm,
});
