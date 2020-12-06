const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const statSchema = new Schema({
	squat: { type: Number, required: true },
	deadlift: { type: Number, required: true },
	military_press: { type: Number, required: true },
	bench_press: { type: Number, required: true },
	romanian_deadlift: { type: Number, required: true },
	leg_press: { type: Number, required: true },
	front_squat: { type: Number, required: true },
	bent_over_rows: { type: Number, required: true },
	_user: { type: Schema.Types.ObjectId, ref: "User" },
});

mongoose.model("stats", statSchema);
