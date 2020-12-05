const mongoose = require("mongoose");
const User = mongoose.model("users");
const Lifts = mongoose.model("lifts");

module.exports = app => {
	app.get("/api/workouts", async (req, res) => {
		const lifts = await Lifts.findOne({ _user: req.user });

		if (!lifts) {
			return res.send(null);
		}

		res.send(lifts);
	});

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

		const user = await User.findByIdAndUpdate(req.user._id, {
			workout_routine: "a",
		});

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
			await user.save();
			await lifts.save();
			res.send(req.user);
		} catch (e) {
			res.status(422).send(e);
		}
	});

	app.patch("/api/workouts", async (req, res) => {
		const change = req.body;

		const updates = Object.keys(change);
		const allowedUpdates = [
			"squat",
			"deadlift",
			"bench_press",
			"military_press",
			"leg_press",
			"romanian_deadlift",
			"front_squat",
			"bent_over_rows",
		];
		const isValidOperation = updates.every(update => {
			return allowedUpdates.includes(update);
		});

		if (!isValidOperation) {
			return res.status(400).send({ error: "Invalid updates" });
		}

		const user = await User.findByIdAndUpdate(req.user._id, {
			workout_routine: "A",
		});

		try {
			const lifts = await Lifts.findOne({ _user: req.user._id });

			if (!lifts) {
				return res.status(404).send();
			}

			updates.forEach(update => (lifts[update] = change[update]));
			await user.save();
			await lifts.save();
			res.send(req.user);
		} catch (e) {
			res.status(500).send();
		}
	});
};
