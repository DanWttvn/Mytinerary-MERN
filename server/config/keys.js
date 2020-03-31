module.exports = {
	mongoURI:
		"mongodb+srv://dan_wttvn:navepm11@mytinerarycluster-cw2gn.mongodb.net/myitinerary?retryWrites=true&w=majority", //from connection en atlas en mytunerarycluster
	secretOrKey: 'd8a6ac3789aa6ccc7dfafdf414e946d71161fcd171fa9adf0c198345e0816efdb65ead47bb00e26b2ab604b5773e02de4b3fe4c4df9854f56607573e9e43066c', //key that jw will use to encrypt the toke. the "" can be whatever. this tandom key is generated in the node termminal with > require("crypto").randomBytes(64).toString("hex"),
	google: {
		// de console.developers.gogle, my pro yn the Google Cloud Platform:
		clientID: "63906682050-vaviih7ts7o3nvlp4v1k0ghac1jsv5th.apps.googleusercontent.com", 
		clientSecret: "HfVHpAU0jJA782R8JTF3eWJ4"
	},
	facebook: {
		// de console.developers.facebook,
		clientID: "2529892880664148", 
		clientSecret: "e5aa1a9f2bf431bb273a5bc536ad1295"
	}
};
