import React from "react";
import { shallow, mount } from "enzyme";

import { findByTestAttr } from "../../../test/testUtils";
import Chart from "./Chart";

const logData = {
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

const defaultProps = { logData, liftChart: "squat" };

const setup = (props = {}) => {
	const setupProps = { ...defaultProps, ...props };
	const wrapper = shallow(<Chart {...setupProps} />);

	return wrapper;
};

describe("Component", () => {
	let wrapper;

	test("renders component without error", () => {
		wrapper = setup();
		const component = findByTestAttr(wrapper, "component-chart");

		expect(component.length).toBe(1);
	});

	test("Ref should be available in instance", () => {
		wrapper = mount(<Chart {...defaultProps} />);

		const component = findByTestAttr(wrapper, "component-chart");

		expect(component.instance()).toBe(wrapper.instance().myRef.current);
	});
});
