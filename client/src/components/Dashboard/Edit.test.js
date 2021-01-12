import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, storeFactory } from "../../../test/testUtils";
import Edit, { ConnectedEdit } from "./Edit";

test("empty", () => {});

// const location = {
// 	state: {
// 		logData: {
// 			_id: 1,
// 			date: new Date("2020-12-01T11:56:41.469+00:00"),
// 			squat: {
// 				set_1: { weight: 315, reps: 5 },
// 				set_2: { weight: 315, reps: 5 },
// 				set_3: { weight: 315, reps: 5 },
// 			},
// 			romanian_deadlift: {
// 				set_1: { weight: 225, reps: 5 },
// 				set_2: { weight: 225, reps: 5 },
// 				set_3: { weight: 225, reps: 5 },
// 			},
// 		},
// 	},
// };

// const defaultProps = { location };

// const setup = (state = {}, props = {}) => {
// 	const store = storeFactory(state);
// 	const setupProps = { ...defaultProps, ...props };
// 	const wrapper = shallow(<ConnectedEdit store={store} {...setupProps} />)
// 		.dive()
// 		.dive()
// 		.dive();

// 	return wrapper;
// };

// describe("Component", () => {
// 	let wrapper;

// 	test("render component without error", () => {
// 		wrapper = setup();
// 		const component = findByTestAttr(wrapper, "component-edit");
// 		expect(component.length).toBe(1);
// 	});
// });
