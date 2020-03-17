const passport = require("passport");;

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const mongoose = require("mongoose")
const keys = require("./keys")
const userModel = require("../model/userModel")

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
