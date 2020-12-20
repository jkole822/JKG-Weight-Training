// Parent component of WorkoutLog and WorkouLogtReview components
// Functional aspect of this component is to unmount form values from the form
// once a user navigates away from WorkoutLogNew entirely and then back to WorkoutLogNew
import React, { Component } from "react";
import { reduxForm } from "redux-form";
import WorkoutLog from "./WorkoutLog";
import WorkoutLogReview from "./WorkoutLogReview";

class WorkoutNew extends Component {
	// Dictates whether to show the WorkoutForm or WorkoutReview component
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

// Specifying form here will unmount previous form values input by user in the
// WorkoutLog component since destroyOnUnmount is set to false.
export default reduxForm({
	form: "workoutLog",
})(WorkoutNew);
