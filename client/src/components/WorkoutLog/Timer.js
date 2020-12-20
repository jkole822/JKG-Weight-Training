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

	async handleMinutesChange(event) {
		this.resetTimer();
		const input = parseInt(event.target.value);
		if (!input || input < 0) {
			await this.setState({ minutes: "" });
		} else if (input < 100) {
			await this.setState({ minutes: parseInt(input) });
		}
		this.recalcuateTotalTime();
	}

	async handleSecondsChange(event) {
		this.resetTimer();
		const input = parseInt(event.target.value);
		if (!input || input < 0) {
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
			<div>
				<div>
					{this.renderTime()}
					<div className="row">
						<button
							className="btn waves-effect waves-light light-blue darken-4 waves-effect waves-light col offset-s1 s4"
							onClick={this.toggleTimer}
						>
							<i className="material-icons">
								{this.state.timerActive ? "pause" : "play_arrow"}
							</i>
						</button>

						<button
							className="btn waves-effect waves-light light-blue darken-4 waves-effect waves-light col offset-s2 s4"
							onClick={this.resetTimer}
						>
							<i className="material-icons">skip_previous</i>
						</button>
					</div>
				</div>

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
