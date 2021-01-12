import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, storeFactory } from "../../../test/testUtils";
import { ConnectedDeload, UnconnectedDeload } from "./Deload";

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

const setup = (state = {}) => {
	const store = storeFactory(state);
	const wrapper = shallow(<ConnectedDeload store={store} />)
		.dive()
		.dive();

	return wrapper;
};

describe("Component", () => {
	let wrapper;

	test("renders component without error", () => {
		wrapper = setup();
		const component = findByTestAttr(wrapper, "component-deload");
		expect(component.length).toBe(1);
	});

	test("renders content", () => {
		wrapper = setup();
		const content = findByTestAttr(wrapper, "content");
		expect(content.length).toBe(8);
	});
});

describe("Local State", () => {
	const wrapper = setup({ stats });

	test("has access to `deloadStats` local state", () => {
		expect(wrapper.state("deloadStats")).toEqual({});
	});

	test("has access to `deloadPercent` local state", () => {
		expect(wrapper.state("deloadPercent")).toEqual({});
	});

	test("updates `deloadPercent` and `deloadStats` on dropdown selection", async () => {
		await wrapper.find("Dropdown").at(0).simulate("change", "5", "squat");

		expect(wrapper.state("deloadPercent")).toEqual({ squat: "5" });
		expect(wrapper.state("deloadStats")).toEqual({ squat: 300 });
	});

	test("resets `deloadPercent` and `deloadStats` on reset click", async () => {
		await wrapper.find("Dropdown").at(0).simulate("change", "5", "squat");
		await wrapper
			.find("Dropdown")
			.at(1)
			.simulate("change", "10", "romanian_deadlift");

		const resetButton = findByTestAttr(wrapper, "button-reset");
		resetButton.at(0).simulate("click");

		expect(wrapper.state("deloadPercent")).toEqual({
			squat: "",
			romanian_deadlift: "10",
		});
		expect(wrapper.state("deloadStats")).toEqual({
			squat: "",
			romanian_deadlift: 205,
		});
	});

	test("resets `deloadPercent` and `deloadStats` on reset all click", async () => {
		await wrapper.find("Dropdown").at(0).simulate("change", "5", "squat");
		await wrapper
			.find("Dropdown")
			.at(1)
			.simulate("change", "10", "romanian_deadlift");

		const resetButton = findByTestAttr(wrapper, "button-reset-all");
		resetButton.simulate("click");

		expect(wrapper.state("deloadPercent")).toEqual({});
		expect(wrapper.state("deloadStats")).toEqual({});
	});
});

describe("Redux Properties", () => {
	const wrapper = setup({ stats });

	test("has access to `stats` state", () => {
		const statsProp = wrapper.instance().props.stats;
		expect(statsProp).toEqual(stats);
	});
});

test("`fetchStats` runs on Deload mount`", async () => {
	const fetchStatsMock = jest.fn();
	const props = { fetchStats: fetchStatsMock };
	const wrapper = shallow(<UnconnectedDeload {...props} />);

	await wrapper.instance().componentDidMount();
	const fetchStatsMockCallCount = fetchStatsMock.mock.calls.length;

	expect(fetchStatsMockCallCount).toBe(1);
});
