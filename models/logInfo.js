const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const setSchema = require("./set");

const logInfoSchema = new Schema({
	set_1: setSchema,
	set_2: setSchema,
	set_3: setSchema,
});

module.exports = logInfoSchema;
