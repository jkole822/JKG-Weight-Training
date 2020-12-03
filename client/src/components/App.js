import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import NewWorkout from "./NewWorkout";
import WorkoutReview from "./WorkoutReview";

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<BrowserRouter>
				<div className="container">
					<Header />
					<Route path="/" component={Landing} exact />
					<Route path="/workouts" component={Dashboard} exact />
					<Route path="/workouts/new" component={NewWorkout} exact />
					<Route path="/workouts/review" component={WorkoutReview} exact />
				</div>
			</BrowserRouter>
		);
	}
}

export default connect(null, actions)(App);
