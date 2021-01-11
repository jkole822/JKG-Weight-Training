import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, storeFactory } from "../../../test/testUtils";
import HistoryLog from "./HistoryLog";

const logData = {
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
};

const defaultProps = { logData };

const setup = (props = {}) => {
	const setupProps = { ...defaultProps, ...props };
	return shallow(<HistoryLog {...setupProps} />);
};

describe("Component", () => {
	const wrapper = setup();
	test("renders component without error", () => {
		const component = findByTestAttr(wrapper, "component-log-history");
		expect(component.length).toBe(1);
	});

	test("renders log content", () => {
		const content = findByTestAttr(wrapper, "content");
		expect(content.length).toBe(2);
	});

	test("renders sub-content", () => {
		const subContent = findByTestAttr(wrapper, "content");
		expect(subContent.length).toBe(2);
	});
});
