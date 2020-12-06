const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const logInfoSchema = require("./logInfo");

const logSchema = new Schema({
	squat: logInfoSchema,
	deadlift: logInfoSchema,
	military_press: logInfoSchema,
	bench_press: logInfoSchema,
	romanian_deadlift: logInfoSchema,
	leg_press: logInfoSchema,
	front_squat: logInfoSchema,
	bent_over_rows: logInfoSchema,
});

module.exports = logSchema;
