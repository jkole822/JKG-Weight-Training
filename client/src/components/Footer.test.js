import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr } from "../../test/testUtils";
import Footer from "./Footer";

describe("Component", () => {
	test("renders component without error", () => {
		const wrapper = shallow(<Footer />);
		const component = findByTestAttr(wrapper, "component-footer");
		expect(component.length).toBe(1);
	});
});
