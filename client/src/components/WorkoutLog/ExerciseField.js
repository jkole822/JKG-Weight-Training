/* eslint-disable import/no-anonymous-default-export */
import React from "react";

export default ({ input, label, placeholder, meta: { error, touched } }) => {
	return (
		<div className="col s4">
			<label>{label}</label>
			<input
				className="center-align"
				type="number"
				// spread in attributes from input from redux form
				{...input}
				placeholder={placeholder}
				style={{ fontSize: "0.8rem", color: "#039be5" }}
			/>
			{/* Validation Errors  */}
			<div className="red-text" style={{ marginBottom: "20px" }}>
				{touched && error}
			</div>
		</div>
	);
};
