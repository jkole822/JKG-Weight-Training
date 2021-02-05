const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const mongoose = require("mongoose");
const keys = require("../../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
	done(null, user._id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => done(null, user));
});

passport.use(
	new GitHubStrategy(
		{
			clientID: keys.githubClientID,
			clientSecret: keys.githubClientSecret,
			callbackURL: "/auth/github/callback",
			proxy: true,
		},
		async (accessToken, refreshToken, profile, done) => {
			const id = profile.id;
			const username = profile.username;

			const existingUser = await User.findOne({ id });

			if (existingUser) {
				return done(null, existingUser);
			}

			const user = await new User({
				id,
				username,
			}).save();

			done(null, user);
		}
	)
);
