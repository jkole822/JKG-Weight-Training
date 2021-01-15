import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr } from "../../../test/testUtils";
import errorFormFields from "../errorFormFields";
import WorkoutLog, { UnconnectedWorkoutLog } from "./WorkoutLog";

const defaultProps = {
	handleSubmit: jest.fn(),
	formValues: {},
	auth: false,
};

const setup = (props = {}) => {
	const setupProps = { ...defaultProps, ...props };
	const wrapper = shallow(<UnconnectedWorkoutLog {...setupProps} />);
	return wrapper;
};

describe("Component", () => {
	test("render component without error", () => {
		const wrapper = setup();
		const component = findByTestAttr(wrapper, "component-workout-log");
		expect(component.length).toBe(1);
	});

	test("does not render any exercise child components when `auth` state is falsy", () => {
		const wrapper = setup();
		const content = findByTestAttr(wrapper, "component-exercise");
		expect(content.length).toBe(0);
	});

	test("renders two exercise child components when workout_routine equals 'a", () => {
		const wrapper = setup({ auth: { workout_routine: "a" } });
		const content = findByTestAttr(wrapper, "component-exercise");
		expect(content.length).toBe(2);
	});

	test("renders three exercise child components when workout_routine equals 'b", () => {
		const wrapper = setup({ auth: { workout_routine: "b" } });
		const content = findByTestAttr(wrapper, "component-exercise");
		expect(content.length).toBe(3);
	});

	test("renders three exercise child components when workout_routine equals 'c", () => {
		const wrapper = setup({ auth: { workout_routine: "c" } });
		const content = findByTestAttr(wrapper, "component-exercise");
		expect(content.length).toBe(3);
	});
});

describe("Validation", () => {
	setup({ auth: { workout_routine: "a" } });

	const input = {
		squat: {
			set_1: {
				weight: 100,
				reps: 5,
			},
		},
		romanian_deadlift: {
			set_1: {
				weight: 100,
				reps: 5,
			},
		},
	};

	test("returns empty object when positive integers are passed in as values for each field", () => {
		const errorObj = WorkoutLog.defaultProps.validate(input);
		expect(errorObj).toEqual(errorFormFields);
	});

	test("returns modified errorFormField when a negative integer is passed in for weight", () => {
		const errorObj = WorkoutLog.defaultProps.validate({
			squat: { set_1: { weight: -100, reps: 5 } },
		});
		const changes = {
			squat: {
				set_1: { weight: "Cannot be negative", reps: "" },
				set_2: { weight: "", reps: "" },
				set_3: { weight: "", reps: "" },
			},
		};
		const expectedObj = { ...errorObj, ...changes };
		expect(errorObj).toEqual(expectedObj);
	});

	test("returns modified errorFormField when a negative integer is passed in for reps", () => {
		const errorObj = WorkoutLog.defaultProps.validate({
			squat: { set_1: { weight: 100, reps: -5 } },
		});
		const changes = {
			squat: {
				set_1: { weight: "", reps: "Cannot be negative" },
				set_2: { weight: "", reps: "" },
				set_3: { weight: "", reps: "" },
			},
		};
		const expectedObj = { ...errorObj, ...changes };
		expect(errorObj).toEqual(expectedObj);
	});

	test("returns modified errorFormField when a positive integer is passed in for weight and the corresponding reps field is left empty", () => {
		const errorObj = WorkoutLog.defaultProps.validate({
			squat: { set_1: { weight: 100 } },
		});
		const changes = {
			squat: {
				set_1: { weight: "", reps: "Enter reps" },
				set_2: { weight: "", reps: "" },
				set_3: { weight: "", reps: "" },
			},
		};
		const expectedObj = { ...errorObj, ...changes };
		expect(errorObj).toEqual(expectedObj);
	});

	test("returns modified errorFormField when a positive integer is passed in for reps and the corresponding weight field is left empty", () => {
		const errorObj = WorkoutLog.defaultProps.validate({
			squat: { set_1: { reps: 5 } },
		});
		const changes = {
			squat: {
				set_1: { weight: "Enter weight", reps: "" },
				set_2: { weight: "", reps: "" },
				set_3: { weight: "", reps: "" },
			},
		};
		const expectedObj = { ...errorObj, ...changes };
		expect(errorObj).toEqual(expectedObj);
	});
});

test("`fetchStats` runs on WorkoutLog mount`", async () => {
	const fetchStatsMock = jest.fn();
	const props = { fetchStats: fetchStatsMock };
	const wrapper = setup(props);

	await wrapper.instance().componentDidMount();
	const fetchStatsMockCallCount = fetchStatsMock.mock.calls.length;

	expect(fetchStatsMockCallCount).toBe(1);
});
