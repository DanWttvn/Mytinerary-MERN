const express = require("express");
const app = express();

const bodyParser = require("body-parser"); //ahora express icluye bodyparse, pero bueno. habria que cambiar el app.use(bodyp->express.json())
const cors = require("cors");
const path = require("path")

const db = require("./config/keys").mongoURI;
const mongoose = require("mongoose");

const passport = require("passport");
const passportSetup = require("./config/passport-setup"); 



app.use(bodyParser.json()); //para poder leer ,manda json
app.use("/uploads", express.static("uploads")) // make uploads public
app.use(
	bodyParser.urlencoded({ //urlencoded es que te pone name&apellido?xxx en lugar de un json object
		extended: true
	})
);
app.use(cors());

mongoose.connect(db, { // db = my key
	useNewUrlParser: true, 
	useCreateIndex: true, 
	useUnifiedTopology: true 
})
    .then(() => console.log('Connection to Mongo DB established'))
    .catch(err => console.log(err));

	
// PASSPORT
app.use(passportSetup.initialize());


// ENDPOINTS
app.use("/api/cities", require("./routes/api/cities")); // routes cities conected con endpoint cities ? . 
//cuando el client pide api/cities, va a ese archivo
// Crea un puerto al que me voy a poder conectar desde el front end. si me llega una peticion a 5000/cities me conecta con ese archivo de router
app.use("/api/itineraries", require("./routes/api/itineraries")); 
app.use("/api/users", require("./routes/api/users")); 
app.use("/api/auth", require("./routes/api/auth")); // 5000/auth


// DEPLOY
// Serve statuc asssets if in production
if (process.env.NODE_ENV === "production") {
	//set static folder
	app.use(express.static("client/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
	});
}


const port = process.env.PORT || 5000; //el puerto que sea y, si no hay ninguno, el 5000

app.listen(port, () => {
	console.log("Server running on " + port + " port");
});