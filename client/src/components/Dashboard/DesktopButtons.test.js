import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr } from "../../../test/testUtils";
import DesktopButtons from "./DesktopButtons";

const defaultProps = { stats: true };

const setup = (props = {}) => {
	const setupProps = { ...defaultProps, ...props };
	const wrapper = shallow(<DesktopButtons {...setupProps} />);

	return wrapper;
};

describe("Component", () => {
	let wrapper;

	test("renders component without error when `stats` prop is truthy", () => {
		wrapper = setup();
		const componentOne = findByTestAttr(
			wrapper,
			"component-desktop-buttons-one"
		);
		const componentTwo = findByTestAttr(
			wrapper,
			"component-desktop-buttons-two"
		);

		expect(componentOne.length).toBe(1);
		expect(componentTwo.length).toBe(0);
	});

	test("renders component without error when `stats` prop is falsey", () => {
		wrapper = setup({ stats: false });
		const componentOne = findByTestAttr(
			wrapper,
			"component-desktop-buttons-one"
		);
		const componentTwo = findByTestAttr(
			wrapper,
			"component-desktop-buttons-two"
		);

		expect(componentOne.length).toBe(0);
		expect(componentTwo.length).toBe(1);
	});
});
