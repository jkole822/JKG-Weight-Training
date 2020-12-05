import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import NewWorkout from "./NewWorkout";
import WorkoutReview from "./WorkoutReview";
import WorkoutLog from "./WorkoutLog";

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<BrowserRouter>
				<Header />
				<div className="container">
					<Route path="/" component={Landing} exact />
					<Route path="/workouts" component={Dashboard} exact />
					<Route path="/workouts/new" component={NewWorkout} exact />
					<Route path="/workouts/review" component={WorkoutReview} exact />
					<Route path="/workouts/log" component={WorkoutLog} exact />
				</div>
			</BrowserRouter>
		);
	}
}

export default connect(null, actions)(App);
