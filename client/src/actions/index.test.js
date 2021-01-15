import moxios from "moxios";
import { storeFactory } from "../../test/testUtils";

import {
	fetchUser,
	fetchStats,
	fetchLogs,
	submitWorkout,
	submitLog,
	deleteLog,
} from "./";

describe("Action Creators", () => {
	beforeEach(() => {
		moxios.install();
	});

	afterEach(() => {
		moxios.uninstall();
	});

	test("`fetchUser` adds user auth info to state", () => {
		const store = storeFactory();
		const auth = { id: "1", username: "Kole", workout_routine: "a" };

		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				response: auth,
			});
		});

		return store.dispatch(fetchUser()).then(() => {
			const newState = store.getState();
			expect(newState.auth).toEqual(auth);
		});
	});

	test("`fetchStats` adds user stats info to state", () => {
		const store = storeFactory();
		const stats = {
			squat: 315,
			deadlift: 365,
			bench_press: 225,
			military_press: 135,
			romanian_deadlift: 225,
			leg_press: 400,
			front_squat: 185,
			bent_over_rows: 185,
		};

		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				response: stats,
			});
		});

		return store.dispatch(fetchStats()).then(() => {
			const newState = store.getState();
			expect(newState.stats).toEqual(stats);
		});
	});

	test("`fetchLogs` adds user log info to state", () => {
		const store = storeFactory();
		const log = {
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

		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				response: log,
			});
		});

		return store.dispatch(fetchLogs()).then(() => {
			const newState = store.getState();
			expect(newState.logs).toEqual(log);
		});
	});

	test("`submitWorkout` adds user info to state", () => {
		const store = storeFactory();
		const auth = { id: "1", username: "Kole", workout_routine: "b" };

		moxios.wait(() => {
			const firstRequest = moxios.requests.at(0);
			firstRequest.respondWith({
				status: 200,
				response: true,
			});
		});

		moxios.wait(() => {
			const secondRequest = moxios.requests.at(1);
			secondRequest.respondWith({
				status: 200,
				response: auth,
			});
		});

		return store.dispatch(submitWorkout("", [])).then(() => {
			const newState = store.getState();
			expect(newState.auth).toEqual(auth);
		});
	});

	test("`submitLog` adds user info to state", () => {
		const store = storeFactory();
		const auth = { id: "1", username: "Kole", workout_routine: "c" };

		moxios.wait(() => {
			const firstRequest = moxios.requests.at(0);
			firstRequest.respondWith({
				status: 200,
				response: true,
			});
		});

		moxios.wait(() => {
			const secondRequest = moxios.requests.at(1);
			secondRequest.respondWith({
				status: 200,
				response: auth,
			});
		});

		moxios.wait(() => {
			const thirdRequest = moxios.requests.at(2);
			thirdRequest.respondWith({
				status: 200,
				response: {},
			});
		});

		return store.dispatch(submitLog("", [])).then(() => {
			const newState = store.getState();
			expect(newState.auth).toEqual(auth);
		});
	});

	test("`deleteLog` adds user log info to state", () => {
		const store = storeFactory();
		const log = {
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

		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				response: log,
			});
		});

		return store.dispatch(deleteLog()).then(() => {
			const newState = store.getState();
			expect(newState.logs).toEqual(log);
		});
	});
});
