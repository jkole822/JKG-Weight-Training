import React, { Component } from "react";
import { reduxForm } from "redux-form";
import WorkoutLog from "./WorkoutLog";
import WorkoutLogReview from "./WorkoutLogReview";

class WorkoutNew extends Component {
	state = { showFormReview: false };

	renderContent() {
		if (this.state.showFormReview === true) {
			return (
				<WorkoutLogReview
					onCancel={() => this.setState({ showFormReview: false })}
				/>
			);
		}

		return (
			<WorkoutLog onLogSubmit={() => this.setState({ showFormReview: true })} />
		);
	}

	render() {
		return <div>{this.renderContent()}</div>;
	}
}

export default reduxForm({
	form: "workoutLog",
})(WorkoutNew);
