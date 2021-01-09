/* eslint-disable import/no-anonymous-default-export */
import React from "react";

export default ({ input, label, meta: { error, touched } }) => {
	return (
		<div>
			<label>{label}</label>
			<input
				type="number"
				autoComplete="off"
				// spread in attributes from input from redux form
				{...input}
				style={{ fontSize: "0.8rem", color: "#e0e0e0", marginBottom: "5px" }}
			/>
			{/* Validation Errors  */}
			<div className="red-text" style={{ marginBottom: "20px" }}>
				{touched && error}
			</div>
		</div>
	);
};
