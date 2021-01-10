import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, storeFactory } from "../../../test/testUtils";
import History, { UnconnectedHistory } from "./History";

const logs = {
	logHistory: [
		{
			_id: 1,
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
		{
			_id: 2,
			date: new Date("2020-12-03T11:56:41.469+00:00"),
			deadlift: {
				set_1: { weight: 365, reps: 5 },
				set_2: { weight: 365, reps: 5 },
				set_3: { weight: 365, reps: 5 },
			},
			leg_press: {
				set_1: { weight: 400, reps: 5 },
				set_2: { weight: 400, reps: 5 },
				set_3: { weight: 400, reps: 5 },
			},
			front_squat: {
				set_1: { weight: 185, reps: 5 },
				set_2: { weight: 185, reps: 5 },
				set_3: { weight: 185, reps: 5 },
			},
		},
		{
			_id: 3,
			date: new Date("2020-12-05T11:56:41.469+00:00"),
			bench_press: {
				set_1: { weight: 225, reps: 5 },
				set_2: { weight: 225, reps: 5 },
				set_3: { weight: 225, reps: 5 },
			},
			military_press: {
				set_1: { weight: 135, reps: 5 },
				set_2: { weight: 135, reps: 5 },
				set_3: { weight: 135, reps: 5 },
			},
			bent_over_rows: {
				set_1: { weight: 185, reps: 5 },
				set_2: { weight: 185, reps: 5 },
				set_3: { weight: 185, reps: 5 },
			},
		},
		{
			_id: 4,
			date: new Date("2020-12-08T11:56:41.469+00:00"),
			squat: {
				set_1: { weight: 320, reps: 5 },
				set_2: { weight: 320, reps: 5 },
				set_3: { weight: 320, reps: 5 },
			},
			romanian_deadlift: {
				set_1: { weight: 230, reps: 5 },
				set_2: { weight: 230, reps: 5 },
				set_3: { weight: 230, reps: 5 },
			},
		},
		{
			_id: 5,
			date: new Date("2020-12-10T11:56:41.469+00:00"),
			deadlift: {
				set_1: { weight: 370, reps: 5 },
				set_2: { weight: 370, reps: 5 },
				set_3: { weight: 370, reps: 5 },
			},
			leg_press: {
				set_1: { weight: 405, reps: 5 },
				set_2: { weight: 405, reps: 5 },
				set_3: { weight: 405, reps: 5 },
			},
			front_squat: {
				set_1: { weight: 190, reps: 5 },
				set_2: { weight: 190, reps: 5 },
				set_3: { weight: 190, reps: 5 },
			},
		},
		{
			_id: 6,
			date: new Date("2020-12-12T11:56:41.469+00:00"),
			bench_press: {
				set_1: { weight: 230, reps: 5 },
				set_2: { weight: 230, reps: 5 },
				set_3: { weight: 230, reps: 5 },
			},
			military_press: {
				set_1: { weight: 140, reps: 5 },
				set_2: { weight: 140, reps: 5 },
				set_3: { weight: 140, reps: 5 },
			},
			bent_over_rows: {
				set_1: { weight: 190, reps: 5 },
				set_2: { weight: 190, reps: 5 },
				set_3: { weight: 190, reps: 5 },
			},
		},
	],
};

const setup = (state = {}) => {
	const store = storeFactory(state);
	const wrapper = shallow(<History store={store} />)
		.dive()
		.dive();
	return wrapper;
};

describe("Component", () => {
	let wrapper;

	test("renders component without error", () => {
		wrapper = setup();

		const component = findByTestAttr(wrapper, "component-history");
		expect(component.length).toBe(1);
	});

	test("does not render log sections when no logs are saved to `logs` state", async () => {
		const fetchLogsMock = jest.fn();
		const logs = { logHistory: [] };
		const props = { fetchLogs: fetchLogsMock, logs };
		const wrapper = shallow(<UnconnectedHistory {...props} />);

		await wrapper.instance().componentDidMount();

		const logSections = findByTestAttr(wrapper, "section-log");
		expect(logSections.length).toBe(0);
	});

	test("renders five log sections when more than five logs are saved to `logs` state", async () => {
		const fetchLogsMock = jest.fn();
		const props = { fetchLogs: fetchLogsMock, logs };
		const wrapper = shallow(<UnconnectedHistory {...props} />);

		await wrapper.instance().componentDidMount();

		const logSections = findByTestAttr(wrapper, "section-log");
		expect(logSections.length).toBe(5);
	});
});

describe("Local State", () => {
	const wrapper = setup({ logs });

	test("has access to `page` local state", () => {
		expect(wrapper.state("page")).toBe(0);
	});

	test("has access to `logToDelete` local state", () => {
		expect(wrapper.state("logToDelete")).toBe("");
	});

	test("has access to `displayedLogs` local state", () => {
		expect(wrapper.state("displayedLogs")).toEqual([]);
	});

	test("should update `page` local state on next button click", async () => {
		const fetchLogsMock = jest.fn();
		const props = { fetchLogs: fetchLogsMock, logs };
		const wrapper = shallow(<UnconnectedHistory {...props} />);

		await wrapper.instance().componentDidMount();

		const nextButton = findByTestAttr(wrapper, "button-next");
		nextButton.at(0).simulate("click");

		expect(nextButton.length).toBe(1);
		expect(wrapper.state("page")).toBe(1);
	});

	test("should update `page` local state on back button click", () => {
		const fetchLogsMock = jest.fn();
		const props = { fetchLogs: fetchLogsMock, logs };
		const wrapper = shallow(<UnconnectedHistory {...props} />).setState({
			page: 2,
		});

		const backButton = findByTestAttr(wrapper, "button-back");
		backButton.at(0).simulate("click");

		expect(backButton.length).toBe(1);
		expect(wrapper.state("page")).toBe(1);
	});

	test("should update `logToDelete` local state on delete (prime) button click", async () => {
		const fetchLogsMock = jest.fn();
		const props = { fetchLogs: fetchLogsMock, logs };
		const wrapper = shallow(<UnconnectedHistory {...props} />);

		await wrapper.instance().componentDidMount();

		const deleteButton = findByTestAttr(wrapper, "button-delete-prime");
		deleteButton.at(0).simulate("click");

		expect(wrapper.state("logToDelete")).toBe(6);
	});

	test("should update `displayedLogs` on History mount", async () => {
		const fetchLogsMock = jest.fn();
		const props = { fetchLogs: fetchLogsMock, logs };
		const wrapper = shallow(<UnconnectedHistory {...props} />);

		await wrapper.instance().componentDidMount();

		expect(wrapper.state("displayedLogs")).toEqual([
			{
				_id: 6,
				date: new Date("2020-12-12T11:56:41.469+00:00"),
				bench_press: {
					set_1: { weight: 230, reps: 5 },
					set_2: { weight: 230, reps: 5 },
					set_3: { weight: 230, reps: 5 },
				},
				military_press: {
					set_1: { weight: 140, reps: 5 },
					set_2: { weight: 140, reps: 5 },
					set_3: { weight: 140, reps: 5 },
				},
				bent_over_rows: {
					set_1: { weight: 190, reps: 5 },
					set_2: { weight: 190, reps: 5 },
					set_3: { weight: 190, reps: 5 },
				},
			},
			{
				_id: 5,
				date: new Date("2020-12-10T11:56:41.469+00:00"),
				deadlift: {
					set_1: { weight: 370, reps: 5 },
					set_2: { weight: 370, reps: 5 },
					set_3: { weight: 370, reps: 5 },
				},
				leg_press: {
					set_1: { weight: 405, reps: 5 },
					set_2: { weight: 405, reps: 5 },
					set_3: { weight: 405, reps: 5 },
				},
				front_squat: {
					set_1: { weight: 190, reps: 5 },
					set_2: { weight: 190, reps: 5 },
					set_3: { weight: 190, reps: 5 },
				},
			},
			{
				_id: 4,
				date: new Date("2020-12-08T11:56:41.469+00:00"),
				squat: {
					set_1: { weight: 320, reps: 5 },
					set_2: { weight: 320, reps: 5 },
					set_3: { weight: 320, reps: 5 },
				},
				romanian_deadlift: {
					set_1: { weight: 230, reps: 5 },
					set_2: { weight: 230, reps: 5 },
					set_3: { weight: 230, reps: 5 },
				},
			},
			{
				_id: 3,
				date: new Date("2020-12-05T11:56:41.469+00:00"),
				bench_press: {
					set_1: { weight: 225, reps: 5 },
					set_2: { weight: 225, reps: 5 },
					set_3: { weight: 225, reps: 5 },
				},
				military_press: {
					set_1: { weight: 135, reps: 5 },
					set_2: { weight: 135, reps: 5 },
					set_3: { weight: 135, reps: 5 },
				},
				bent_over_rows: {
					set_1: { weight: 185, reps: 5 },
					set_2: { weight: 185, reps: 5 },
					set_3: { weight: 185, reps: 5 },
				},
			},
			{
				_id: 2,
				date: new Date("2020-12-03T11:56:41.469+00:00"),
				deadlift: {
					set_1: { weight: 365, reps: 5 },
					set_2: { weight: 365, reps: 5 },
					set_3: { weight: 365, reps: 5 },
				},
				leg_press: {
					set_1: { weight: 400, reps: 5 },
					set_2: { weight: 400, reps: 5 },
					set_3: { weight: 400, reps: 5 },
				},
				front_squat: {
					set_1: { weight: 185, reps: 5 },
					set_2: { weight: 185, reps: 5 },
					set_3: { weight: 185, reps: 5 },
				},
			},
		]);
	});
});

describe("Redux Properties", () => {
	const wrapper = setup({ logs });

	test("has access to `logs` state", () => {
		const logsProp = wrapper.instance().props.logs;
		expect(logsProp).toEqual(logs);
	});

	test("`fetchLogs` action creator is a function on the props", () => {
		const fetchLogsProp = wrapper.instance().props.fetchLogs;
		expect(fetchLogsProp).toBeInstanceOf(Function);
	});
});

test("`fetchLogs` runs on History mount`", async () => {
	const fetchLogsMock = jest.fn();
	const props = { fetchLogs: fetchLogsMock };
	const wrapper = shallow(<UnconnectedHistory {...props} />);

	await wrapper.instance().componentDidMount();
	const fetchLogsMockCallCount = fetchLogsMock.mock.calls.length;

	expect(fetchLogsMockCallCount).toBe(1);
});

test("`deleteLog` runs on delete confirm`", () => {
	// const fetchLogsMock = jest.fn();
	const deleteLogMock = jest.fn();
	const props = { deleteLog: deleteLogMock };
	const wrapper = shallow(<UnconnectedHistory {...props} />);

	const deleteButton = findByTestAttr(wrapper, "button-delete-confirm");
	deleteButton.at(0).simulate("click");
	const deleteLogMockCallCount = deleteLogMock.mock.calls.length;

	expect(deleteLogMockCallCount).toBe(1);
});
