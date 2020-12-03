const mongoose = require("mongoose");

const Lifts = mongoose.model("lifts");

module.exports = app => {
	app.post("/api/workouts", async (req, res) => {
		const {
			squat,
			deadlift,
			bench_press,
			military_press,
			leg_press,
			romanian_deadlift,
			front_squat,
			bent_over_rows,
		} = req.body;

		const lifts = new Lifts({
			squat,
			deadlift,
			bench_press,
			military_press,
			leg_press,
			romanian_deadlift,
			front_squat,
			bent_over_rows,
			_user: req.user._id,
		});

		try {
			await lifts.save();
			res.send(req.user);
		} catch (e) {
			res.status(422).send(e);
		}
	});
};
