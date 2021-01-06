import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr } from "../../test/testUtils";
import Landing from "./Landing";

test("renders component without error", () => {
	const wrapper = shallow(<Landing />);
	const component = findByTestAttr(wrapper, "component-landing");
	expect(component.length).toBe(1);
});
