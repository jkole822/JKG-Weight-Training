// Parent component of WorkoutForm and WorkoutReview components
// Functional aspect of this component is to unmount form values from the form
// once a user navigates away from WorkoutNew entirely and then back to WorkoutNew
import React, { Component } from "react";
import { reduxForm } from "redux-form";
import WorkoutForm from "./WorkoutForm";
import WorkoutReview from "./WorkoutReview";

export class UnconnectedWorkoutNew extends Component {
	// Dictates whether to show the WorkoutForm or WorkoutReview component
	state = { showFormReview: false };

	renderContent() {
		if (this.state.showFormReview === true) {
			return (
				<div data-test="component-workout-review">
					<WorkoutReview
						onCancel={() => this.setState({ showFormReview: false })}
					/>
				</div>
			);
		}

		return (
			<div data-test="component-workout-form">
				<WorkoutForm
					onWorkoutSubmit={() => this.setState({ showFormReview: true })}
				/>
			</div>
		);
	}

	render() {
		return (
			<div data-test="component-workout-new" className="container">
				{this.renderContent()}
			</div>
		);
	}
}

// Specifying form here will unmount previous form values input by user in the
// WorkoutForm component since destroyOnUnmount is set to false.
export default reduxForm({
	form: "workoutForm",
})(UnconnectedWorkoutNew);
