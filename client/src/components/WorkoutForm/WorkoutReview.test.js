import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr } from "../../../test/testUtils";
import { UnconnectedWorkoutReview } from "./WorkoutReview";

const formValues = {
	squat: 315,
	deadlift: 365,
	bench_press: 225,
	military_press: 135,
	romanian_deadlift: 225,
	leg_press: 400,
	front_squat: 185,
	bent_over_rows: 185,
};

const defaultProps = {
	formValues,
};

const setup = (props = {}) => {
	const setupProps = { ...defaultProps, ...props };
	const wrapper = shallow(<UnconnectedWorkoutReview {...setupProps} />);
	return wrapper;
};

describe("Component", () => {
	const wrapper = setup();

	test("renders component without error", () => {
		const component = findByTestAttr(wrapper, "component-workout-review");
		expect(component.length).toBe(1);
	});

	test("renders content from `reviewFields` function", () => {
		const content = findByTestAttr(wrapper, "content");
		expect(content.length).toBe(8);
	});
});
