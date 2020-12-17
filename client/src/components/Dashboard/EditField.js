/* eslint-disable import/no-anonymous-default-export */
import React from "react";

export default ({
	value,
	placeholder,
	input,
	label,
	meta: { error, touched },
}) => {
	return (
		<div className="col s4">
			<label>{label}</label>
			<input
				className="center-align"
				type="number"
				value={value}
				placeholder={placeholder}
				{...input}
				style={{ fontSize: "0.8rem", color: "#e0e0e0" }}
			/>
			<div className="red-text" style={{ marginBottom: "20px" }}>
				{touched && error}
			</div>
		</div>
	);
};
