import React from "react";
import { mount } from "enzyme";
import Root from "../../Root";
import App from "../App";
import Header from "../Header";
import Footer from "../Footer";

let wrapper;

beforeEach(() => {
	wrapper = mount(
		<Root>
			<App />
		</Root>
	);
});

afterEach(() => {
	wrapper.unmount();
});

it("shows the Header component", () => {
	expect(wrapper.find(Header).length).toEqual(1);
});

it("shows the Footer component", () => {
	expect(wrapper.find(Footer).length).toBe(1);
});
