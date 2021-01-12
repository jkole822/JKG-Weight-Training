// Dropdown menu for Deload page
import React, { Component } from "react";
import _ from "lodash";

class Dropdown extends Component {
	// Create the options for the dropdown menu
	renderDropdownOptions() {
		const dropdownValues = ["5", "10", "15", "20", "25"];
		const options = _.map(dropdownValues, dropdownValue => {
			return (
				<option
					data-test="dropdown-options"
					key={dropdownValue}
					value={dropdownValue}
				>
					{`${dropdownValue}%`}
				</option>
			);
		});
		return options;
	}

	render() {
		return (
			<form data-test="component-dropdown" className="input-field">
				<select
					onChange={event => {
						// Send the select option value and corresponding exercise name
						// back to the deload component to call its handleChange function
						// with the value taget value and the name
						this.props.onChange(event.target.value, this.props.name);
					}}
				>
					<option>Select value</option>
					{this.renderDropdownOptions()}
				</select>
				<label className="light-blue-text text-darken-1">
					Deload Percentage
				</label>
			</form>
		);
	}
}

export default Dropdown;
