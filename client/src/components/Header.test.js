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

describe("Component", () => {
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
});

describe("Login/Logout Buttons", () => {
	describe("Rendering when signed in", () => {
		let wrapper;
		beforeEach(() => {
			const initialState = {
				auth: { id: "123" },
			};
			wrapper = setup(initialState);
		});
		test("renders logout button when signed in", () => {
			// Renders two versions, one for the main navbar and one for the mobile sidebar.
			const logoutButton = findByTestAttr(wrapper, "button-logout");
			expect(logoutButton.length).toBe(2);
		});

		test("does not render login button when signed in", () => {
			const googleButton = findByTestAttr(wrapper, "button-google");
			const facebookButton = findByTestAttr(wrapper, "button-facebook");

			expect(googleButton.length).toBe(0);
			expect(facebookButton.length).toBe(0);
		});
	});

	describe("Rendering when not signed in", () => {
		let wrapper;
		beforeEach(() => {
			const initialState = {
				auth: false,
			};
			wrapper = setup(initialState);
		});

		test("does not render logout button when not signed", () => {
			const logoutButton = findByTestAttr(wrapper, "button-logout");
			expect(logoutButton.length).toBe(0);
		});

		test("renders login button when not signed in", () => {
			// Renders two versions, one for the main navbar and one for the mobile sidebar.
			const googleButton = findByTestAttr(wrapper, "button-google");
			const facebookButton = findByTestAttr(wrapper, "button-facebook");

			expect(googleButton.length).toBe(2);
			expect(facebookButton.length).toBe(2);
		});
	});
});

describe("Redux Props", () => {
	test("has auth piece of state as prop", () => {
		const auth = { id: "123 " };
		const wrapper = setup({ auth });
		const authProp = wrapper.instance().props.auth;
		expect(authProp).toBe(auth);
	});
});
