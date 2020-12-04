import axios from "axios";
import { FETCH_USER, FETCH_STATS } from "./types";

export const fetchUser = () => async dispatch => {
	const res = await axios.get("/api/current_user");

	dispatch({
		type: FETCH_USER,
		payload: res.data,
	});
};

export const fetchStats = () => async dispatch => {
	const res = await axios.get("/api/workouts");

	dispatch({
		type: FETCH_STATS,
		payload: res.data,
	});
};

export const submitWorkout = (values, history) => async dispatch => {
	const existingStats = await axios.get("/api/workouts");

	var res;
	if (existingStats.data) {
		res = await axios.patch("/api/workouts", values);
	} else {
		res = await axios.post("/api/workouts", values);
	}

	history.push("/workouts/log");
	dispatch({
		type: FETCH_USER,
		payload: res.data,
	});
};
