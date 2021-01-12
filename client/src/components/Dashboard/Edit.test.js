import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, storeFactory } from "../../../test/testUtils";
import Edit, { UnconnectedEdit } from "./Edit";

const location = {
	state: {
		logData: {
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
	},
};

const defaultProps = { location, formValues: {}, handleSubmit: jest.fn() };

const setup = (props = {}) => {
	const setupProps = { ...defaultProps, ...props };
	const wrapper = shallow(<UnconnectedEdit {...setupProps} />);

	return wrapper;
};

describe("Component", () => {
	const wrapper = setup();

	test("render component without error", () => {
		const component = findByTestAttr(wrapper, "component-edit");
		expect(component.length).toBe(1);
	});

	test("renders content", () => {
		const content = findByTestAttr(wrapper, "content");
		expect(content.length).toBe(2);
	});

	test("renders sub-content", () => {
		const subContent = findByTestAttr(wrapper, "sub-content");
		expect(subContent.length).toBe(6);
	});
});
