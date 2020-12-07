import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
	return (
		<div className="row">
			<Link to="/workouts/log" className="btn btn-large teal col s12 m4">
				Start Workout
			</Link>
			<Link to="/workouts/new" className="btn btn-large red col s12 m4">
				Begin New Program
			</Link>
		</div>
	);
};

export default Dashboard;
