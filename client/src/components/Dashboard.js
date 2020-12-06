import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
	return (
		<div>
			<Link to="/workouts/new" className="btn btn-large red">
				Begin New Program
			</Link>
			<Link to="/workouts/log" className="btn btn-large teal right">
				Start Workout
			</Link>
		</div>
	);
};

export default Dashboard;
