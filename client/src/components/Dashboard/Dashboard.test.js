import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, storeFactory } from "../../../test/testUtils";
import Dashboard, { UnconnectedDashboard } from "./Dashboard";

const setup = (state = {}) => {
	const store = storeFactory(state);
	const wrapper = shallow(<Dashboard store={store} />)
		.dive()
		.dive();
	return wrapper;
};

const stats = { squat: 315 };
const logs = {
	logHistory: [
		{
			date: new Date("2020-12-01T11:56:41.469+00:00"),
			squat: {
				set_1: { weight: 315, reps: 5 },
				set_2: { weight: 315, reps: 5 },
				set_3: { weight: 315, reps: 5 },
			},
			romanian_deadlift: {
				set_1: { weight: 225, reps: 5 },
				set_2: { weight: 225, reps: 5 },
				set_3: { weight: 225, reps: 5 },
			},
		},
	],
};

describe("Component", () => {
	let wrapper;

	test("renders component without error when `stats` prop is truthy", () => {
		wrapper = setup({ stats });
		const componentOne = findByTestAttr(wrapper, "component-dashboard-one");
		const componentTwo = findByTestAttr(wrapper, "component-dashboard-two");

		expect(componentOne.length).toBe(0);
		expect(componentTwo.length).toBe(1);
	});

	test("renders component without error when `stats` prop is falsey", () => {
		wrapper = setup({ stats: false });
		const componentOne = findByTestAttr(wrapper, "component-dashboard-one");
		const componentTwo = findByTestAttr(wrapper, "component-dashboard-two");

		expect(componentOne.length).toBe(1);
		expect(componentTwo.length).toBe(0);
	});

	test("renders dropdown when `logs` state contains data", async () => {
		const prevProps = { logs: null };
		wrapper = setup({ stats, logs });

		await wrapper.instance().componentDidUpdate(prevProps);

		const dropdown = findByTestAttr(wrapper, "dropdown");
		const dropdownOptions = findByTestAttr(wrapper, "dropdown-options");

		expect(dropdown.length).toBe(1);
		expect(dropdownOptions.length).toBe(8);
	});
});

describe("Local State", () => {
	const wrapper = setup({ stats, logs });

	test("has access to `logData` local state", () => {
		expect(wrapper.state("logData")).toEqual({});
	});

	test("has access to `liftChart` local state", () => {
		expect(wrapper.state("liftChart")).toBe("squat");
	});

	test("should update `logData` local state on componentDidUpdate", async () => {
		const prevProps = { logs: null };
		await wrapper.instance().componentDidUpdate(prevProps);
		const expectedState = {
			squat: {
				label: "Squat",
				log: [{ date: new Date("2020-12-01T11:56:41.469+00:00"), weight: 315 }],
			},
			romanian_deadlift: {
				label: "Romanian Deadlift",
				log: [{ date: new Date("2020-12-01T11:56:41.469+00:00"), weight: 225 }],
			},
			deadlift: { label: "Deadlift", log: [] },
			leg_press: { label: "Leg Press", log: [] },
			front_squat: { label: "Front Squat", log: [] },
			bench_press: { label: "Bench Press", log: [] },
			military_press: { label: "Military Press", log: [] },
			bent_over_rows: { label: "Bent Over Rows", log: [] },
		};

		expect(wrapper.state("logData")).toEqual(expectedState);
	});

	test("should update `liftChart` local state on dropdown selection", () => {
		const dropdown = findByTestAttr(wrapper, "select-dropdown");
		dropdown.at(0).simulate("change", {
			target: { value: "deadlift" },
		});

		expect(wrapper.state("liftChart")).toBe("deadlift");
	});
});

describe("Redux Properties", () => {
	const wrapper = setup({ stats, logs });

	test("has access to `stats` state", () => {
		const statsProp = wrapper.instance().props.stats;
		expect(statsProp).toBe(stats);
	});

	test("has access to `logs` state", () => {
		const logsProp = wrapper.instance().props.logs;
		expect(logsProp).toBe(logs);
	});

	test("`fetchStats` action creator is a function on the props", () => {
		const fetchStatsProp = wrapper.instance().props.fetchStats;
		expect(fetchStatsProp).toBeInstanceOf(Function);
	});

	test("`fetchLogs` action creator is a function on the props", () => {
		const fetchLogsProp = wrapper.instance().props.fetchLogs;
		expect(fetchLogsProp).toBeInstanceOf(Function);
	});
});

test("`fetchStats` and `fetchLogs` run on Dashboard mount`", async () => {
	const fetchStatsMock = jest.fn();
	const fetchLogsMock = jest.fn();

	const props = { fetchStats: fetchStatsMock, fetchLogs: fetchLogsMock };
	const wrapper = shallow(<UnconnectedDashboard {...props} />);

	await wrapper.instance().componentDidMount();
	const fetchStatsMockCallCount = fetchStatsMock.mock.calls.length;
	const fetchLogsMockCallCount = fetchLogsMock.mock.calls.length;

	expect(fetchStatsMockCallCount).toBe(1);
	expect(fetchLogsMockCallCount).toBe(1);
});
