import { FETCH_LOGS } from "../actions/types";
import logsReducer from "./logsReducer";

test("return default initial state of `[]` when no action is passed", () => {
	const newState = logsReducer(undefined, {});
	expect(newState).toEqual([]);
});

test("returns state assigned to action.payload upon receiving an action of type `FETCH_LOGS`", () => {
	const payload = {
		logHistory: [
			{
				date: new Date("2020-12-01T11:56:41.469Z"),
				romanian_deadlift: {
					set_1: { weight: 100, reps: 5 },
					set_2: { weight: 100, reps: 5 },
					set_3: { weight: 100, reps: 5 },
				},
				squat: {
					set_1: { weight: 100, reps: 5 },
					set_2: { weight: 100, reps: 5 },
					set_3: { weight: 100, reps: 5 },
				},
			},
			{
				date: new Date("2020-12-03T11:56:41.469Z"),
				deadlift: {
					set_1: { weight: 100, reps: 5 },
					set_2: { weight: 100, reps: 5 },
					set_3: { weight: 100, reps: 5 },
				},
				leg_press: {
					set_1: { weight: 100, reps: 5 },
					set_2: { weight: 100, reps: 5 },
					set_3: { weight: 100, reps: 5 },
				},
				front_squat: {
					set_1: { weight: 100, reps: 5 },
					set_2: { weight: 100, reps: 5 },
					set_3: { weight: 100, reps: 5 },
				},
			},
		],
	};
	const newState = logsReducer([], { type: FETCH_LOGS, payload });
	expect(newState).toEqual(payload);
});
