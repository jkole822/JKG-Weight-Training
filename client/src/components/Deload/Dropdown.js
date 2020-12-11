import React, { Component } from "react";
import _ from "lodash";

class Dropdown extends Component {
	renderDropdownOptions() {
		const dropdownValues = ["5", "10", "15", "20", "25"];
		const options = _.map(dropdownValues, dropdownValue => {
			return (
				<option key={dropdownValue} value={dropdownValue}>
					{`${dropdownValue}%`}
				</option>
			);
		});
		return options;
	}

	render() {
		return (
			<form className="input-field">
				<select
					onChange={event => {
						this.props.onChange(event.target.value, this.props.name);
					}}
				>
					<option>Select value</option>
					{this.renderDropdownOptions()}
				</select>
				<label>Deload Percentage</label>
			</form>
		);
	}
}

export default Dropdown;
