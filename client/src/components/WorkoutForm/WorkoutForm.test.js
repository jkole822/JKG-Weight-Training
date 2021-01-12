import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr } from "../../../test/testUtils";
import WorkoutForm, { UnconnectedWorkoutForm } from "./WorkoutForm";

describe("Component", () => {
	const setupProps = { handleSubmit: jest.fn() };
	const wrapper = shallow(<UnconnectedWorkoutForm {...setupProps} />);

	test("render component without error", () => {
		const component = findByTestAttr(wrapper, "component-workout-form");
		expect(component.length).toBe(1);
	});

	test("renders input fields", () => {
		const content = findByTestAttr(wrapper, "input-fields");
		expect(content.length).toBe(8);
	});
});

describe("Validation", () => {
	const input = {
		squat: 100,
		romanian_deadlift: 100,
		deadlift: 100,
		leg_press: 100,
		front_squat: 100,
		bench_press: 100,
		military_press: 100,
		bent_over_rows: 100,
	};

	test("returns empty object when positive integers are passed in as values for each field", () => {
		const errorObj = WorkoutForm.defaultProps.validate(input);
		expect(errorObj).toEqual({});
	});

	test("returns error object with message `Cannot be negative` when a negative integer is passed in", () => {
		const errorInput = { ...input, squat: -100 };
		const errorObj = WorkoutForm.defaultProps.validate(errorInput);

		expect(errorObj).toEqual({ squat: "Cannot be negative" });
	});

	test("returns error object with message `Enter a weight for [EXERCISE_NAME]` when a field is left empty", () => {
		const errorInput = { ...input, squat: "" };
		const errorObj = WorkoutForm.defaultProps.validate(errorInput);
		expect(errorObj).toEqual({ squat: "Enter a weight for Squat" });
	});
});
