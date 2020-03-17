const express = require("express");
const app = express();
const port = process.env.PORT || 5000; //el puerto que sea y, si no hay ninguno, el 5000

const bodyParser = require("body-parser"); //ahora express icluye bodyparse, pero bueno. habria que cambiar el app.use(bodyp->express.json())
const cors = require("cors");

const db = require("./config/keys").mongoURI;
const mongoose = require("mongoose");

const passport = require("passport");
const passportSetup = require("./config/passport-setup"); 



app.use(bodyParser.json()); //para poder leer ,manda json
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


// ENDPOINT ? relativo a esto ahora? ççççç
app.use("/cities", require("./routes/cities")); // routes cities conected con endpoint cities ? . 
// Crea un puerto al que me voy a poder conectar desde el front end. si me llega una peticion a 5000/cities me conecta con ese archivo de router
app.use("/itineraries", require("./routes/itineraries")); 
app.use("/user", require("./routes/user")); 
app.use("/auth", require("./routes/auth")); // 5000/auth


app.listen(port, () => {
	console.log("Server running on " + port + " port");
});