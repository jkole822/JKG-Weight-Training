import { FETCH_STATS } from "../actions/types";
import statsReducer from "./statsReducer";

test("return default initial state of `[]` when no action is passed", () => {
	const newState = statsReducer(undefined, {});
	expect(newState).toEqual([]);
});

test("returns state assigned to action.payload upon receiving an action of type `FETCH_STATS`", () => {
	const payload = {
		squat: 315,
		deadlift: 365,
		bench_press: 225,
		military_press: 135,
		romanian_deadlift: 225,
		leg_press: 400,
		front_squat: 185,
		bent_over_rows: 185,
	};
	const newState = statsReducer([], { type: FETCH_STATS, payload });
	expect(newState).toEqual(payload);
});
