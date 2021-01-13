import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, storeFactory } from "../../../test/testUtils";
import Exercise from "./Exercise";

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
	const wrapper = shallow(<Exercise store={store} />)
		.dive()
		.dive();
	return wrapper;
};

describe("Component", () => {
	const wrapper = setup();

	test("renders component without error", () => {
		const component = findByTestAttr(wrapper, "component-exercise");
		expect(component.length).toBe(1);
	});

	test("renders content", () => {
		const content = findByTestAttr(wrapper, "content");
		expect(content.length).toBe(3);
	});
});

describe("Redux Properties", () => {
	const wrapper = setup({ stats });

	test("has access to `stats` state", () => {
		const statsProp = wrapper.instance().props.stats;
		expect(statsProp).toEqual(stats);
	});
});
