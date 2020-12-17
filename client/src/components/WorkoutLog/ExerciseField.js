/* eslint-disable import/no-anonymous-default-export */
import React from "react";

export default ({ input, label, placeholder, meta: { error, touched } }) => {
	return (
		<div className="col s4">
			<label>{label}</label>
			<input
				className="center-align"
				type="number"
				{...input}
				placeholder={placeholder}
				style={{ fontSize: "0.8rem", color: "#e0e0e0" }}
			/>
			<div className="red-text" style={{ marginBottom: "20px" }}>
				{touched && error}
			</div>
		</div>
	);
};
