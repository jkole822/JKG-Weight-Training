/* eslint-disable import/no-anonymous-default-export */
import React from "react";

const PageNotFound = ({ stats }) => {
	console.log(stats);
	return (
		<div id="not-found" className="light-blue-text text-darken-3">
			404: Page not found.
		</div>
	);
};

export default PageNotFound;
