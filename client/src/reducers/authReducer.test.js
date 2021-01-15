import { FETCH_USER } from "../actions/types";
import authReducer from "./authReducer";

test("return default initial state of `null` when no action is passed", () => {
	const newState = authReducer(undefined, {});
	expect(newState).toBe(null);
});

test("returns state assigned to action.payload upon receiving an action of type `FETCH_USER`", () => {
	const payload = { id: "1", username: "Kole", workout_routine: "a" };
	const newState = authReducer(null, { type: FETCH_USER, payload });
	expect(newState).toEqual(payload);
});

test("returns state of `false` upon receiving an action of type `FETCH_USER` and falsy payload", () => {
	const payload = null;
	const newState = authReducer(null, { type: FETCH_USER, payload });
	expect(newState).toBe(false);
});
