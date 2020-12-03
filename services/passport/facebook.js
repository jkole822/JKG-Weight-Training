const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
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
	new FacebookStrategy(
		{
			clientID: keys.facebookClientID,
			clientSecret: keys.facebookClientSecret,
			callbackURL: "/auth/facebook/callback",
			proxy: true,
		},
		async (accessToken, refreshToken, profile, done) => {
			const id = profile.id;
			const username = profile.displayName;

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
