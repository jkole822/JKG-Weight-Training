/* eslint-disable import/no-anonymous-default-export */
import { FETCH_LOGS } from "../actions/types";

export default function (state = [], action) {
	switch (action.type) {
		case FETCH_LOGS:
			return action.payload;
		default:
			return state;
	}
}
