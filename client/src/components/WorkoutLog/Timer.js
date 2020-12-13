import React, { Component } from "react";

class Timer extends Component {
	constructor(props) {
		super(props);

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

	componentDidMount() {
		setInterval(() => {
			if (
				this.state.timerActive &&
				this.state.totalSeconds > this.state.secondsElapsed
			) {
				this.setState({ secondsElapsed: this.state.secondsElapsed + 1 });
			}
		}, 100);
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

	getFormattedMinutes() {
		const secondsLeft = this.state.totalSeconds - this.state.secondsElapsed;
		const minutesLeft = Math.floor(secondsLeft / 60);
		let formattedMinutes;

		if (minutesLeft < 10) {
			formattedMinutes = "0" + minutesLeft;
		} else {
			formattedMinutes = minutesLeft;
		}

		return formattedMinutes;
	}

	getFormattedSeconds() {
		const secondsLeft =
			(this.state.totalSeconds - this.state.secondsElapsed) % 60;

		let formattedSeconds;

		if (secondsLeft < 10) {
			formattedSeconds = "0" + secondsLeft;
		} else {
			formattedSeconds = secondsLeft;
		}

		return formattedSeconds;
	}

	renderTime() {
		const seconds = this.getFormattedSeconds();
		const minutes = this.getFormattedMinutes();

		return (
			<div id="timer">
				<span id="minutes">{minutes}</span>
				<span id="seconds">{seconds}</span>
			</div>
		);
	}

	async handleMinutesChange(event) {
		const input = parseInt(event.target.value);
		if (!input) {
			await this.setState({ minutes: "" });
		} else if (input < 100) {
			await this.setState({ minutes: parseInt(input) });
		}
		this.recalcuateTotalTime();
	}

	async handleSecondsChange(event) {
		const input = parseInt(event.target.value);
		if (!input) {
			await this.setState({ seconds: "" });
		} else if (input < 60) {
			await this.setState({ seconds: parseInt(input) });
		}
		this.recalcuateTotalTime();
	}

	async recalcuateTotalTime() {
		await this.setState({
			totalSeconds: parseInt(this.state.minutes * 60 + this.state.seconds),
		});
	}

	render() {
		return (
			<div className="row">
				<div className="col s6">
					<div id="timer-buttons">
						<button
							id="timer-button-one"
							className="btn-floating waves-effect waves-light red"
							onClick={this.toggleTimer}
						>
							<i className="material-icons">
								{this.state.timerActive ? "pause" : "play_arrow"}
							</i>
						</button>
						{this.renderTime()}
						<button
							id="timer-button-two"
							className="btn-floating waves-effect waves-light red"
							onClick={this.resetTimer}
						>
							<i className="material-icons">loop</i>
						</button>
					</div>
				</div>
				<div className="col s6">
					<div className="row">
						<div className="col s6">
							<label className="timer-label">Minutes</label>
							<input
								className="center-align"
								value={this.state.minutes}
								type="number"
								onChange={this.handleMinutesChange}
								disabled={this.state.timerActive}
							/>
						</div>
						<div className="col s6">
							<label className="timer-label">Seconds</label>
							<input
								className="center-align"
								value={this.state.seconds}
								type="number"
								onChange={this.handleSecondsChange}
								disabled={this.state.timerActive}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Timer;
