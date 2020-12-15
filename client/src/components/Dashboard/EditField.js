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
		<div>
			<label>{label}</label>
			<input
				className="center-align"
				type="number"
				value={value}
				placeholder={placeholder}
				{...input}
				style={{ marginBottom: "5px" }}
			/>
			<div className="red-text" style={{ marginBottom: "20px" }}>
				{touched && error}
			</div>
		</div>
	);
};
