import axios from "axios";
import { FETCH_USER, FETCH_STATS, FETCH_LOGS } from "./types";

export const fetchUser = () => async dispatch => {
	const res = await axios.get("/api/current_user");

	dispatch({
		type: FETCH_USER,
		payload: res.data,
	});
};

export const fetchStats = () => async dispatch => {
	const res = await axios.get("/api/stats");

	dispatch({
		type: FETCH_STATS,
		payload: res.data,
	});
};

export const fetchLogs = () => async dispatch => {
	const res = await axios.get("/api/log");

	dispatch({
		type: FETCH_LOGS,
		payload: res.data,
	});
};

export const submitWorkout = (values, history) => async dispatch => {
	const existingStats = await axios.get("/api/stats");

	let res;
	if (existingStats.data) {
		res = await axios.patch("/api/stats/new", values);
	} else {
		res = await axios.post("/api/stats", values);
	}

	history.push("/workouts/log");
	dispatch({
		type: FETCH_USER,
		payload: res.data,
	});
};

export const submitLog = (values, history) => async dispatch => {
	const existingLog = await axios.get("/api/log");

	let res;
	if (existingLog.data) {
		res = await axios.patch("/api/log", values);
	} else {
		res = await axios.post("/api/log", values);
	}

	await axios.patch("/api/stats/update", values);

	history.push("/workouts");
	dispatch({
		type: FETCH_USER,
		payload: res.data,
	});
};

export const deleteLog = id => async dispatch => {
	const res = await axios.delete(`/api/log/${id}`);

	dispatch({
		type: FETCH_LOGS,
		payload: res.data,
	});
};
