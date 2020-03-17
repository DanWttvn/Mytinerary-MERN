const passport = require("passport");

const GoogleStrategy = require("passport-google-oauth20");
const jwt = require("jsonwebtoken");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const mongoose = require("mongoose")
const keys = require("./keys")
const userModel = require("../model/userModel")

// --------------- GOOGLE --------------- //

module.exports = passport.use(
	new GoogleStrategy({
		callbackURL: "/auth/google/redirect", // where I redirect after the auth (also set in the google credentials)
		clientID: keys.google.clientID,
		clientSecret: keys.google.clientSecret
		}, (accessToken, refreshToken, profile, done) => {
		//passport callback function. fired after the first auth page and comes with a code
		console.log("cb fired");
		// check if user already exists
		userModel.findOne({ googleID: profile.id })
			.then((currentUser) => {
				if (currentUser) {
					const payload = { 
						id: currentUser.id,
						username: currentUser.username
					};
					jwt.sign (
						payload, 
						keys.secretOrKey,
						{ expiresIn: 2592000 },
						(err, token) => {
							if(err) throw err;
							res.json({
								token: token,
								user: {
									id: currentUser.id, //es la primera vez que lo pongo, pero parece que crea uno solito
									username: currentUser.username,
									email: currentUser.email
								},
							})
							console.log("logged succesfully");
						}
					)
					console.log("already exists. user is:", currentUser);
					done(null, currentUser);
				} else {
					// create new user in OUR db  with googles data
					new userModel({
						username: profile.displayName,
						googleID: profile.id
					}).save()
						.then((newUser) => {
							// ··· create TOKEN ?? ççç como lo attach al newUser???
							const payload = { 
								id: currentUser.id,
								username: currentUser.username
							};
							jwt.sign (
								payload, 
								keys.secretOrKey,
								{ expiresIn: 2592000 },
								(err, token) => {
									if(err) throw err;
									res.json({
										token: token,
										user: {
											id: currentUser.id, //es la primera vez que lo pongo, pero parece que crea uno solito
											username: currentUser.username,
											email: currentUser.email
										},
										success: true,
									})
									console.log("logged succesfully");
								}
							)
							console.log("new user:" + newUser);
							done(null, newUser);
						});
				}
			})	
}));	


// --------------- JWT --------------- //
// new JwtStrategy(options, verify). opts to control how the token is  extracted from the request or verified. verify is a function
const opts = {}; 
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); // aqui extrae el token del header
opts.secretOrKey = keys.secretOrKey;

module.exports = passport.use(
	new JwtStrategy(opts, (jwt_payload, done) => {
		userModel.findById(jwt_payload.id) // check if decoded token matches a user
			.then(user => {
				// TOKEN MATCHES
				if (user) { 
					return done(null, user)
				}
				// TOKEN DOESNT MATCH
				else {
					return done(null, false)
				}
			}).catch(err => console.log(err));
	})
); // estoy exportando el user. ahora en auth.js en la llamada puedo usar user porque lo imporo y comparo al poner  passport.authenticate("jwt"... 
