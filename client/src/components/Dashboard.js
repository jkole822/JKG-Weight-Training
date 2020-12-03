import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
	return (
		<div>
			<Link to="/workouts/new" className="btn btn-large red">
				Start New Workout
			</Link>
		</div>
	);
};

export default Dashboard;
