import React from "react";

const Landing = () => {
	return (
		<div id="landing">
			<h2
				className="white-text"
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					marginTop: 0,
				}}
			>
				If it doesn't challenge you,
			</h2>
			<h3
				className="yellow-text"
				style={{
					position: "absolute",
					top: "57%",
					left: "62%",
					transform: "translate(-57%, -62%)",
					marginTop: 0,
				}}
			>
				it doesn't change you.
			</h3>
		</div>
	);
};

export default Landing;
