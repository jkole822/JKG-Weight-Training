import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard/Dashboard";
import WorkoutNew from "./WorkoutForm/WorkoutNew";
import WorkoutLogNew from "./WorkoutLog/WorkoutLogNew";
import Deload from "./Deload/Deload";
import Edit from "./Dashboard/Edit";
import Footer from "./Footer";
import PageNotFound from "./Dashboard/PageNotFound";

export class UnconnectedApp extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<div className="grey darken-4 grey-text text-lighten-2">
				<div className="content">
					<BrowserRouter>
						<Header />
						<Switch>
							<Route path="/" component={Landing} exact />
							<Route path="/workouts" component={Dashboard} exact />
							<Route path="/workouts/new" component={WorkoutNew} exact />{" "}
							<Route path="/workouts/log" component={WorkoutLogNew} exact />
							<Route path="/workouts/deload" component={Deload} exact />
							<Route path="/workouts/edit" component={Edit} exact />
							<Route component={PageNotFound} />
						</Switch>
					</BrowserRouter>
				</div>
				<Footer />
			</div>
		);
	}
}

export default connect(null, actions)(UnconnectedApp);
