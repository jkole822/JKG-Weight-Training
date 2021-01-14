import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr } from "../../../test/testUtils";
import { UnconnectedWorkoutNew } from "./WorkoutLogNew";

describe("Component", () => {
	const wrapper = shallow(<UnconnectedWorkoutNew />);

	test("renders component without error", () => {
		const component = findByTestAttr(wrapper, "component-workout-log-new");
		expect(component.length).toBe(1);
	});

	test("renders workout form component when `showFormReview` is set to false", () => {
		const WorkoutForm = findByTestAttr(wrapper, "component-workout-log");
		const WorkoutReview = findByTestAttr(
			wrapper,
			"component-workout-log-review"
		);

		expect(WorkoutForm.length).toBe(1);
		expect(WorkoutReview.length).toBe(0);
	});

	test("renders workout form component when `showFormReview` is set to true", () => {
		wrapper.setState({ showFormReview: true });
		const WorkoutForm = findByTestAttr(wrapper, "component-workout-log");
		const WorkoutReview = findByTestAttr(
			wrapper,
			"component-workout-log-review"
		);

		expect(WorkoutForm.length).toBe(0);
		expect(WorkoutReview.length).toBe(1);
	});
});

describe("Local State", () => {
	const wrapper = shallow(<UnconnectedWorkoutNew />);

	test("has access to `showFormReview` local state", () => {
		expect(wrapper.state("showFormReview")).toBe(false);
	});
});
