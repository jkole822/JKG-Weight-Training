// Parent component of WorkoutForm and WorkoutReview components
// Functional aspect of this component is to unmount form values from the form
// once a user navigates away from WorkoutNew entirely and then back to WorkoutNew
import React, { Component } from "react";
import { reduxForm } from "redux-form";
import WorkoutForm from "./WorkoutForm";
import WorkoutReview from "./WorkoutReview";

class WorkoutNew extends Component {
	// Dictates whether to show the WorkoutForm or WorkoutReview component
	state = { showFormReview: false };

	renderContent() {
		if (this.state.showFormReview === true) {
			return (
				<WorkoutReview
					onCancel={() => this.setState({ showFormReview: false })}
				/>
			);
		}

		return (
			<WorkoutForm
				onWorkoutSubmit={() => this.setState({ showFormReview: true })}
			/>
		);
	}

	render() {
		return <div className="container">{this.renderContent()}</div>;
	}
}

// Specifying form here will unmount previous form values input by user in the
// WorkoutForm component since destroyOnUnmount is set to false.
export default reduxForm({
	form: "workoutForm",
})(WorkoutNew);
