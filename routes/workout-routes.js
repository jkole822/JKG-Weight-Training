const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const _ = require("lodash");

const Stats = mongoose.model("stats");
const LogHistory = mongoose.model("logHistory");

module.exports = app => {
	// --------------------------- STATS -----------------------------------
	// Fetches lifting stats for the current user
	app.get("/api/workouts", requireLogin, async (req, res) => {
		const stats = await Stats.findOne({ _user: req.user });

		if (!stats) {
			return res.send(null);
		}

		res.send(stats);
	});

	// Initializes lifting stats for the current user if none currently exist
	app.post("/api/workouts", requireLogin, async (req, res) => {
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

		// Initializes with routine A
		req.user.workout_routine = "a";

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
			const user = await req.user.save();
			await stats.save();
			res.send(user);
		} catch (e) {
			res.status(422).send(e);
		}
	});

	// Overwrites existing stats with user input when starting a new program for the current user
	app.patch("/api/workouts/renew", requireLogin, async (req, res) => {
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

		// Resets to routine A
		req.user.workout_routine = "a";

		try {
			const stats = await Stats.findOne({ _user: req.user._id });
			if (!stats) {
				return res.status(404).send();
			}

			updates.forEach(update => (stats[update] = change[update]));
			const user = await req.user.save();
			await stats.save();
			res.send(user);
		} catch (e) {
			res.status(500).send();
		}
	});

	// Updates lifting stats of the current user based on performance submitted in the workout log
	app.patch("/api/workouts/update", requireLogin, async (req, res) => {
		const log = req.body;
		const exercises = Object.keys(log);

		const stats = await Stats.findOne({ _user: req.user._id });

		exercises.forEach(exercise => {
			const statVolume = stats[exercise] * 5 * 3;
			let logVolume = 0;
			let sumWeight = 0;
			_.forEach(log[exercise], set => {
				const logWeight = set.weight;
				const logReps = set.reps;
				logVolume += parseInt(logWeight) * parseInt(logReps);
				sumWeight += parseInt(logWeight);
			});

			const avgWeight = sumWeight / 3;
			const roundedAvgWeight = Math.round(avgWeight / 5) * 5;

			if (logVolume >= statVolume) {
				stats[exercise] = roundedAvgWeight;
			}
		});

		try {
			await stats.save();
			res.send(stats);
		} catch (e) {
			res.status(422).send(e);
		}
	});

	// Updates the current user's stats based on input submitted through the deload form
	app.patch("/api/workouts/deload", requireLogin, async (req, res) => {
		const updates = req.body;
		const exercises = Object.keys(updates);

		const stats = await Stats.findOne({ _user: req.user._id });

		exercises.forEach(exercise => {
			stats[exercise] = updates[exercise];
		});

		try {
			await stats.save();
			res.send();
		} catch (e) {
			res.status(500).send(error);
		}
	});

	// --------------------------- LOGS -----------------------------------
	// Fetches the most recent workout logs for the current user (up to 60)
	app.get("/api/workouts/log", requireLogin, async (req, res) => {
		const log = await LogHistory.findOne(
			{
				_user: req.user,
			},
			{
				logHistory: { $slice: -60 },
			}
		).exec();

		if (!log) {
			return res.send();
		}

		res.send(log);
	});

	app.get("/api/workouts/log/:page", requireLogin, async (req, res) => {
		const page = parseInt(req.params.page);
		const firstIndex = -5 * page;
		const secondIndex = 5;

		const log = await LogHistory.findOne(
			{
				_user: req.user,
			},
			{
				logHistory: { $slice: [firstIndex, secondIndex] },
			}
		).exec();

		if (!log) {
			return res.send();
		}

		res.send(log);
	});

	// Creates a log book with the submitted log data for the current user
	// if none exists upon submission
	app.post("/api/workouts/log", requireLogin, async (req, res) => {
		// Updates the user's workout routine based on their current workout routine
		switch (req.user.workout_routine) {
			case "a":
				req.user.workout_routine = "b";
				break;
			case "b":
				req.user.workout_routine = "c";
				break;
			default:
				req.user.workout_routine = "a";
				break;
		}

		const log = new LogHistory({
			logHistory: [req.body],
			_user: req.user._id,
		});

		try {
			const user = await req.user.save();
			await log.save();
			res.send(user);
		} catch (e) {
			res.status(422).send(e);
		}
	});

	// Updates the current user's log book with the submitted workout log data
	app.patch("/api/workouts/log", requireLogin, async (req, res) => {
		switch (req.user.workout_routine) {
			case "a":
				req.user.workout_routine = "b";
				break;
			case "b":
				req.user.workout_routine = "c";
				break;
			default:
				req.user.workout_routine = "a";
				break;
		}

		const log = await LogHistory.findOneAndUpdate(
			{ _user: req.user._id },
			{
				$push: { logHistory: req.body },
			}
		);

		try {
			const user = await req.user.save();
			await log.save();
			res.send(user);
		} catch (e) {
			res.status(422).send(e);
		}
	});
};
