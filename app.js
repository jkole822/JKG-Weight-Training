const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const app = express();
const port = process.env.PORT || 5000;
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const passport = require("passport");

mongoose.connect(keys.mongoURI);

require("./models/user");
require("./models/stat");
require("./models/logHistory");
require("./services/passport/facebook");
require("./services/passport/google");
require("./services/passport/github");

// Session stores user information for 24 hours
app.use(bodyParser.json());
app.use(
	cookieSession({
		keys: [keys.cookieKey],
		maxAge: 1000 * 60 * 60 * 24,
	})
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/auth-routes")(app);
require("./routes/workout-routes")(app);

if (process.env.NODE_ENV === "production") {
	// Express will serve up production assets
	// like main.js or main.css
	app.use(express.static("client/build"));

	// Express will serve up the index.html file
	// if it doesn't recognize the route
	const path = require("path");
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});
