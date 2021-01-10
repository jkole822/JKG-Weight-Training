import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr } from "../../../test/testUtils";
import PageNotFound from "./PageNotFound";

describe("Component", () => {
	test("renders component without error", () => {
		const wrapper = shallow(<PageNotFound />);
		const component = findByTestAttr(wrapper, "component-page-not-found");
		expect(component.length).toBe(1);
	});
});
