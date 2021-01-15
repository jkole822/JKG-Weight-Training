import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr } from "../../../test/testUtils";
import Timer from "./Timer";

describe("Component", () => {
	const wrapper = shallow(<Timer />);

	test("renders component without error", () => {
		const component = findByTestAttr(wrapper, "component-timer");
		expect(component.length).toBe(1);
	});

	test("renders display", () => {
		const display = findByTestAttr(wrapper, "display");
		expect(display.length).toBe(1);
	});
});

describe("Local State", () => {
	const wrapper = shallow(<Timer />);

	test("has access to `minutes` local state", () => {
		expect(wrapper.state("minutes")).toBe(1);
	});

	test("has access to `seconds` local state", () => {
		expect(wrapper.state("seconds")).toBe(30);
	});

	test("has access to `totalSeconds` local state", () => {
		expect(wrapper.state("totalSeconds")).toBe(90);
	});

	test("has access to `secondsElapsed` local state", () => {
		expect(wrapper.state("secondsElapsed")).toBe(0);
	});

	test("has access to `timerActive` local state", () => {
		expect(wrapper.state("timerActive")).toBe(false);
	});

	test("timer begins on start click", done => {
		wrapper.instance().componentDidMount();

		const startButton = findByTestAttr(wrapper, "button-start");
		const resetButton = findByTestAttr(wrapper, "button-reset");
		startButton.simulate("click");
		expect(wrapper.state("timerActive")).toBe(true);

		setTimeout(() => {
			expect(wrapper.state("secondsElapsed")).toBe(1);
			resetButton.simulate("click");
			expect(wrapper.state("timerActive")).toBe(false);
			expect(wrapper.state("secondsElapsed")).toBe(0);
			done();
		}, 1000);
	});

	test("timer pauses on start click when timer is active", done => {
		const startButton = findByTestAttr(wrapper, "button-start");
		const resetButton = findByTestAttr(wrapper, "button-reset");
		startButton.simulate("click");
		expect(wrapper.state("timerActive")).toBe(true);

		setTimeout(() => {
			startButton.simulate("click");
			expect(wrapper.state("timerActive")).toBe(false);
			setTimeout(() => {
				expect(wrapper.state("secondsElapsed")).toBe(1);
				resetButton.simulate("click");
				expect(wrapper.state("timerActive")).toBe(false);
				expect(wrapper.state("secondsElapsed")).toBe(0);
				done();
			}, 1000);
		}, 1000);
	});

	test("timer is reset on reset click while timer is active", done => {
		const startButton = findByTestAttr(wrapper, "button-start");
		const resetButton = findByTestAttr(wrapper, "button-reset");
		startButton.simulate("click");
		expect(wrapper.state("timerActive")).toBe(true);

		setTimeout(() => {
			expect(wrapper.state("secondsElapsed")).toBe(1);
			resetButton.simulate("click");
			expect(wrapper.state("timerActive")).toBe(false);
			expect(wrapper.state("secondsElapsed")).toBe(0);
			done();
		}, 1000);
	});

	test("timer is reset on reset click while timer is inactive", done => {
		const startButton = findByTestAttr(wrapper, "button-start");
		const resetButton = findByTestAttr(wrapper, "button-reset");

		startButton.simulate("click");

		expect(wrapper.state("timerActive")).toBe(true);

		setTimeout(() => {
			expect(wrapper.state("secondsElapsed")).toBe(1);
			startButton.simulate("click");
			expect(wrapper.state("timerActive")).toBe(false);
			resetButton.simulate("click");
			expect(wrapper.state("timerActive")).toBe(false);
			expect(wrapper.state("secondsElapsed")).toBe(0);
			done();
		}, 1100);
	});

	test("`minutes` and `totalSeconds` states change on change to minutes input", done => {
		const minutesInput = findByTestAttr(wrapper, "input-minutes");
		minutesInput.simulate("change", { target: { value: "2" } });
		expect(wrapper.state("minutes")).toBe(2);
		setTimeout(() => {
			expect(wrapper.state("totalSeconds")).toBe(150);
			wrapper.setState({ minutes: 1 });
			done();
		}, 100);
	});

	test("`seconds` and `totalSeconds` states change on change to minutes input", done => {
		const secondsInput = findByTestAttr(wrapper, "input-seconds");
		secondsInput.simulate("change", { target: { value: "45" } });
		expect(wrapper.state("seconds")).toBe(45);
		setTimeout(() => {
			expect(wrapper.state("totalSeconds")).toBe(105);
			done();
		}, 100);
	});
});
