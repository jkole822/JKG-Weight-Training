const mongoose = require("mongoose");
const User = mongoose.model("users");
const Stats = mongoose.model("stats");
const LogHistory = mongoose.model("logHistory");

module.exports = app => {
	app.get("/api/workouts", async (req, res) => {
		const stats = await Stats.findOne({ _user: req.user });

		if (!stats) {
			return res.send(null);
		}

		res.send(stats);
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

		const stats = new Stats({
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
			await stats.save();
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
			workout_routine: "a",
		});

		try {
			const stats = await Stats.findOne({ _user: req.user._id });

			if (!stats) {
				return res.status(404).send();
			}

			updates.forEach(update => (stats[update] = change[update]));
			await user.save();
			await stats.save();
			res.send(req.user);
		} catch (e) {
			res.status(500).send();
		}
	});

	app.get("/api/workouts/log", async (req, res) => {
		const log = await LogHistory.findOne({ _user: req.user });

		if (!log) {
			return res.send(null);
		}

		res.send(log);
	});

	app.post("/api/workouts/log", async (req, res) => {
		let user = await User.findById(req.user._id);

		switch (user.workout_routine) {
			case "a":
				user = await User.findByIdAndUpdate(req.user._id, {
					workout_routine: "b",
				});
				break;
			case "b":
				user = await User.findByIdAndUpdate(req.user._id, {
					workout_routine: "c",
				});
				break;
			default:
				user = await User.findByIdAndUpdate(req.user._id, {
					workout_routine: "a",
				});
				break;
		}

		const log = new LogHistory({
			logHistory: [req.body],
			_user: req.user._id,
		});

		try {
			await user.save();
			await log.save();
			res.send(req.user);
		} catch (e) {
			res.status(422).send(e);
		}

		res.send(user);
	});

	app.patch("/api/workouts/log", async (req, res) => {
		let user = await User.findById(req.user._id);

		switch (user.workout_routine) {
			case "a":
				user = await User.findByIdAndUpdate(req.user._id, {
					workout_routine: "b",
				});
				break;
			case "b":
				user = await User.findByIdAndUpdate(req.user._id, {
					workout_routine: "c",
				});
				break;
			default:
				user = await User.findByIdAndUpdate(req.user._id, {
					workout_routine: "a",
				});
				break;
		}

		const log = await LogHistory.findOneAndUpdate(
			{ _user: req.user._id },
			{
				$push: { logHistory: req.body },
			}
		);

		try {
			await user.save();
			await log.save();
			res.send(req.user);
		} catch (e) {
			res.status(422).send(e);
		}

		res.send(user);
	});
};
