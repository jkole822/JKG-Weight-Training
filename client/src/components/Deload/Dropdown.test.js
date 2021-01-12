import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr } from "../../../test/testUtils";
import Dropdown from "./Dropdown";

describe("Component", () => {
	const wrapper = shallow(<Dropdown />);

	test("renders component without error", () => {
		const component = findByTestAttr(wrapper, "component-dropdown");
		expect(component.length).toBe(1);
	});

	test("renders dropdown options", () => {
		const dropdownOptions = findByTestAttr(wrapper, "dropdown-options");
		expect(dropdownOptions.length).toBe(5);
	});
});
