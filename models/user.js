const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	id: String,
	username: String,
	workout_routine: { type: String, lowercase: true },
});

mongoose.model("users", userSchema);
