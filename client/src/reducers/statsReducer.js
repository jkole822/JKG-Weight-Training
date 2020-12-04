/* eslint-disable import/no-anonymous-default-export */
import { FETCH_STATS } from "../actions/types";

export default function (state = [], action) {
	switch (action.type) {
		case FETCH_STATS:
			return action.payload;
		default:
			return state;
	}
}
