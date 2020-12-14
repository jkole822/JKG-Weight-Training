/* eslint-disable import/no-anonymous-default-export */
import { FETCH_LOGS_HISTORY } from "../actions/types";

export default function (state = [], action) {
	switch (action.type) {
		case FETCH_LOGS_HISTORY:
			return action.payload;
		default:
			return state;
	}
}
