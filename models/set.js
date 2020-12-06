const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const setSchema = new Schema({
	weight: { type: Number, trim: true },
	reps: { type: Number, trim: true },
});

module.exports = setSchema;
