const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys")

passport.use(
	new GoogleStrategy({
		callbackURL: "/auth/google/redirect", // where I redirect after the auth (also set in the google credentials)
		clientID: keys.google.clientID,
		clientSecret: keys.google.clientSecret
	}, () => {
		//passport callback fun
	})
)
