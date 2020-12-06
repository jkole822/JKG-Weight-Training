const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const logSchema = require("./log");

const logHistorySchema = new Schema({
	logHistory: [logSchema],
	_user: { type: Schema.Types.ObjectId, ref: "User" },
});

mongoose.model("logHistory", logHistorySchema);
