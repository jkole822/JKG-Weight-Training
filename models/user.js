const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	id: String,
	username: String,
	workout_routine: String,
});

mongoose.model("users", userSchema);
