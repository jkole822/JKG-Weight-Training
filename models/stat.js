const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const statSchema = new Schema({
	squat: { type: Number, required: true, trim: true },
	deadlift: { type: Number, required: true, trim: true },
	military_press: { type: Number, required: true, trim: true },
	bench_press: { type: Number, required: true, trim: true },
	romanian_deadlift: { type: Number, required: true, trim: true },
	leg_press: { type: Number, required: true, trim: true },
	front_squat: { type: Number, required: true, trim: true },
	bent_over_rows: { type: Number, required: true, trim: true },
	_user: { type: Schema.Types.ObjectId, ref: "User" },
});

mongoose.model("stats", statSchema);
