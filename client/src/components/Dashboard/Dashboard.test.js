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

describe("Component", () => {
	let wrapper;

	test("renders component without error when `stats` prop is truthy", () => {
		const initialState = {
			stats: true,
		};
		wrapper = setup(initialState);
		const componentOne = findByTestAttr(wrapper, "component-dashboard-one");
		const componentTwo = findByTestAttr(wrapper, "component-dashboard-two");
		expect(componentOne.length).toBe(0);
		expect(componentTwo.length).toBe(1);
	});

	test("renders component without error when `stats` prop is falsey", () => {
		const initialState = {
			stats: false,
		};
		wrapper = setup(initialState);
		const componentOne = findByTestAttr(wrapper, "component-dashboard-one");
		const componentTwo = findByTestAttr(wrapper, "component-dashboard-two");
		expect(componentOne.length).toBe(1);
		expect(componentTwo.length).toBe(0);
	});
});

describe("Redux Properties", () => {
	let wrapper;
	wrapper = setup();

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
