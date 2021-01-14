import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr } from "../../../test/testUtils";
import Timer from "./Timer";

const wrapper = shallow(<Timer />);

describe("Component", () => {
	test("renders component without error", () => {
		const component = findByTestAttr(wrapper, "component-timer");
		expect(component.length).toBe(1);
	});
});
