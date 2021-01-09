import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr } from "../../../test/testUtils";
import MobileButtons from "./MobileButtons";

const defaultProps = { stats: true };

const setup = (props = {}) => {
	const setupProps = { ...defaultProps, ...props };
	const wrapper = shallow(<MobileButtons {...setupProps} />);

	return wrapper;
};

describe("Component", () => {
	let wrapper;

	test("renders component without error when `stats` prop is truthy", () => {
		wrapper = setup();
		const componentOne = findByTestAttr(
			wrapper,
			"component-mobile-buttons-one"
		);
		const componentTwo = findByTestAttr(
			wrapper,
			"component-mobile-buttons-two"
		);

		expect(componentOne.length).toBe(1);
		expect(componentTwo.length).toBe(0);
	});

	test("renders component without error when `stats` prop is falsey", () => {
		wrapper = setup({ stats: false });
		const componentOne = findByTestAttr(
			wrapper,
			"component-mobile-buttons-one"
		);
		const componentTwo = findByTestAttr(
			wrapper,
			"component-mobile-buttons-two"
		);

		expect(componentOne.length).toBe(0);
		expect(componentTwo.length).toBe(1);
	});
});
