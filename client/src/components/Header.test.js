import React from "react";
import { shallow } from "enzyme";

import { storeFactory, findByTestAttr } from "../../test/testUtils";
import Header, { UnconnectedHeader } from "./Header";

const setup = (initialState = {}) => {
	const store = storeFactory(initialState);
	const wrapper = shallow(<Header store={store} />)
		.dive()
		.dive();

	return wrapper;
};

describe("render", () => {
	let wrapper;
	beforeEach(() => {
		const initialState = {
			auth: { id: "123" },
		};
		wrapper = setup(initialState);
	});

	test("renders component without error", () => {
		const component = findByTestAttr(wrapper, "component-header");
		expect(component.length).toBe(1);
	});

	test("renders logout button when signed in", () => {
		// Renders two versions, one for the main navbar and one for the mobile sidebar.
		const logoutButton = findByTestAttr(wrapper, "button-logout");
		expect(logoutButton.length).toBe(2);
	});

	test("renders login button when not signed in", () => {
		// Renders two versions, one for the main navbar and one for the mobile sidebar.
		const initialState = { auth: false };
		wrapper = setup(initialState);

		const googleButton = findByTestAttr(wrapper, "button-google");
		const facebookButton = findByTestAttr(wrapper, "button-facebook");

		expect(googleButton.length).toBe(2);
		expect(facebookButton.length).toBe(2);
	});
});
