const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
	app.use(
		["/api", "/auth/google", "/auth/facebook", "/auth/github"],
		createProxyMiddleware({
			target: "http://localhost:5000",
		})
	);
};
