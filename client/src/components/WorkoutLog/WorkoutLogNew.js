// Parent component of WorkoutLog and WorkouLogtReview components
// Functional aspect of this component is to unmount form values from the form
// once a user navigates away from WorkoutLogNew entirely and then back to WorkoutLogNew
import React, { Component } from "react";
import { reduxForm } from "redux-form";
import WorkoutLog from "./WorkoutLog";
import WorkoutLogReview from "./WorkoutLogReview";

export class UnconnectedWorkoutNew extends Component {
	// Dictates whether to show the WorkoutForm or WorkoutReview component
	state = { showFormReview: false };

	renderContent() {
		if (this.state.showFormReview === true) {
			return (
				<div data-test="component-workout-log-review">
					<WorkoutLogReview
						onCancel={() => this.setState({ showFormReview: false })}
					/>
				</div>
			);
		}

		return (
			<div data-test="component-workout-log">
				<WorkoutLog
					onLogSubmit={() => this.setState({ showFormReview: true })}
				/>
			</div>
		);
	}

	render() {
		return (
			<div data-test="component-workout-log-new" className="container">
				{this.renderContent()}
			</div>
		);
	}
}

// Specifying form here will unmount previous form values input by user in the
// WorkoutLog component since destroyOnUnmount is set to false.
export default reduxForm({
	form: "workoutLog",
})(UnconnectedWorkoutNew);
