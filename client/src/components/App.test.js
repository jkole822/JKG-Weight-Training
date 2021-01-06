import React from "react";
import { shallow } from "enzyme";

import { storeFactory } from "../../test/testUtils";
import App, { UnconnectedApp } from "./App";

const setup = (state = {}) => {
	const store = storeFactory(state);
	const wrapper = shallow(<App store={store} />).dive();
	return wrapper;
};

describe("redux properties", () => {
	let wrapper;

	test("`fetchUser` action creator is a function on the props", () => {
		wrapper = setup();
		const fetchUserProp = wrapper.instance().props.fetchUser;
		expect(fetchUserProp).toBeInstanceOf(Function);
	});
});

test("`fetchUser runs on App mount`", () => {
	const fetchUserMock = jest.fn();
	const props = { fetchUser: fetchUserMock };
	const wrapper = shallow(<UnconnectedApp {...props} />);

	wrapper.instance().componentDidMount();
	const fetchUserMockCallCount = fetchUserMock.mock.calls.length;

	expect(fetchUserMockCallCount).toBe(1);
});
