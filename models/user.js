const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const userSchema = new Schema({
	id: String,
	username: String,
	workout_routine: { type: String, lowercase: true },
});

mongoose.model("users", userSchema);
