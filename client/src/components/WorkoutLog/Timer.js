import React, { Component } from "react";

class Timer extends Component {
	constructor(props) {
		super(props);

		// minutes and seconds state correspond to input values for the timer
		// totalSeconds is the total number of seconds for the timer
		// elapsedTimer is the number of seconds elapsed since starting the timer
		// timerActive controls whether the timer interval increments elapsedSeconds
		this.state = {
			minutes: 1,
			seconds: 30,
			totalSeconds: 90,
			secondsElapsed: 0,
			timerActive: false,
		};

		this.handleMinutesChange = this.handleMinutesChange.bind(this);
		this.handleSecondsChange = this.handleSecondsChange.bind(this);
		this.toggleTimer = this.toggleTimer.bind(this);
		this.resetTimer = this.resetTimer.bind(this);
	}

	// Starts the interval when the component is mounted, but does not start counting down
	// the timer until timerActive is set to true (default is false)
	componentDidMount() {
		setInterval(() => {
			if (
				this.state.timerActive &&
				this.state.totalSeconds > this.state.secondsElapsed
			) {
				// increments elapsedSeconds every second which is reflected in the
				// rendered values for minutes and seconds while the timer is active
				this.setState({ secondsElapsed: this.state.secondsElapsed + 1 });
			}
		}, 1000);
	}

	toggleTimer() {
		this.setState({ timerActive: !this.state.timerActive });
	}

	resetTimer() {
		this.setState({
			secondsElapsed: 0,
			totalSeconds: parseInt(this.state.minutes * 60 + this.state.seconds),
			timerActive: false,
		});
	}

	// Calculates the minutes to render based off of the difference between the
	// totalSeconds and elapsedSeconds
	getFormattedMinutes() {
		const secondsLeft = this.state.totalSeconds - this.state.secondsElapsed;
		const minutesLeft = Math.floor(secondsLeft / 60);
		let formattedMinutes;

		// Appends zero to the begin if the calculated minutes is less than ten,
		// so that two digits are always rendered for formatting reasons.
		if (minutesLeft < 10) {
			formattedMinutes = "0" + minutesLeft;
		} else {
			formattedMinutes = minutesLeft;
		}

		return formattedMinutes;
	}

	// Calculates the seconds to render based off of the difference between the
	// totalSeconds and elapsedSeconds
	getFormattedSeconds() {
		const secondsLeft =
			(this.state.totalSeconds - this.state.secondsElapsed) % 60;

		let formattedSeconds;

		// Appends zero to the begin if the calculated seconds is less than ten,
		// so that two digits are always rendered for formatting reasons.
		if (secondsLeft < 10) {
			formattedSeconds = "0" + secondsLeft;
		} else {
			formattedSeconds = secondsLeft;
		}

		return formattedSeconds;
	}

	// Renders the timer based on output from getFormattedSeconds and getFormattedMinutes
	// Calls getFormattedSeconds and getFormattedSeconds everytime state updates which occurs every
	// second from the above interval incrementing elapsedSeconds while the timer is active.
	renderTime() {
		const seconds = this.getFormattedSeconds();
		const minutes = this.getFormattedMinutes();

		return (
			<div className="row">
				<div
					className="col s6 offset-s3 grey darken-3 light-blue-text text-darken-1 center-align"
					style={{
						padding: "5vh",
						fontSize: "1.5rem",
						letterSpacing: "2px",
						borderRadius: "25px",
					}}
				>
					{minutes}:{seconds}
				</div>
			</div>
		);
	}

	// Handles the change in input value for minutes
	// Need to set as async to call await for setState in order for recalculateTotalTime
	// to capture the change to this.state.minutes
	async handleMinutesChange(event) {
		// Call resetTimer to ensure elapsedSeconds is reset to zero
		this.resetTimer();
		const input = parseInt(event.target.value);
		// Prevent timer from breaking with incorrect user input
		if (!input || isNaN(input) || input < 0) {
			await this.setState({ minutes: "" });
			// Prevent user from inputting a number with more than two digits
		} else if (input < 100) {
			await this.setState({ minutes: parseInt(input) });
		}
		// Recalculate totalSeconds based on changes to minutes
		this.recalcuateTotalTime();
	}

	async handleSecondsChange(event) {
		// Call resetTimer to ensure elapsedSeconds is reset to zero
		this.resetTimer();
		const input = parseInt(event.target.value);
		// Prevent timer from breaking with incorrect user input
		if (!input || isNaN(input) || input < 0) {
			await this.setState({ seconds: "" });
			// Prevent user from inputting a number greater than or equal to 60 seconds
		} else if (input < 60) {
			await this.setState({ seconds: parseInt(input) });
		}
		// Recalculate totalSeconds based on changes to seconds
		this.recalcuateTotalTime();
	}

	recalcuateTotalTime() {
		this.setState({
			totalSeconds: parseInt(this.state.minutes * 60 + this.state.seconds),
		});
	}

	render() {
		return (
			<div>
				<div>
					{this.renderTime()}
					<div className="row">
						{/* Toggles between start and pause timer */}
						<button
							className="btn waves-effect waves-light light-blue darken-4 waves-effect waves-light col offset-s1 s4"
							onClick={this.toggleTimer}
						>
							<i className="material-icons">
								{this.state.timerActive ? "pause" : "play_arrow"}
							</i>
						</button>

						{/* Resets the timer based on current input for minutes and seconds */}
						<button
							className="btn waves-effect waves-light light-blue darken-4 waves-effect waves-light col offset-s2 s4"
							onClick={this.resetTimer}
						>
							<i className="material-icons">skip_previous</i>
						</button>
					</div>
				</div>

				{/* Input for Minutes */}
				<div className="row">
					<div className="col offset-s1 s4">
						<label>Minutes</label>
						<input
							value={this.state.minutes}
							type="number"
							onChange={this.handleMinutesChange}
							disabled={this.state.timerActive}
							className="grey-text text-lighten-2"
						/>
					</div>
					{/* Input for Seconds */}
					<div className="col offset-s2 s4">
						<label>Seconds</label>
						<input
							value={this.state.seconds}
							type="number"
							onChange={this.handleSecondsChange}
							disabled={this.state.timerActive}
							className="grey-text text-lighten-2"
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default Timer;
