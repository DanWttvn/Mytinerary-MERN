const express = require("express");
const app = express();
const port = process.env.PORT || 5000; //el puerto que sea y, si no hay ninguno, el 5000

const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./keys").mongoURI;
const mongoose = require("mongoose");


app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);
app.use(cors());
app.use(express.json());


app.listen(port, () => {
	console.log("Server running on " + port + " port");
});

// ENDPOINT ? relativo a esto ahora? ççççç
app.use("/cities", require("./routes/cities")); // routes cities conected con endpoint cities ? . 
// Crea un puerto al que me voy a poder conectar desde el front end. si me llega una peticion a 5000/cities me conecta con ese archivo de router
app.use("/itineraries", require("./routes/itineraries")); 
app.use("/user", require("./routes/user")); 

mongoose.connect(db, { // db = my key
	useNewUrlParser: true, 
	useCreateIndex: true, 
	useUnifiedTopology: true 
})
    .then(() => console.log('Connection to Mongo DB established'))
    .catch(err => console.log(err));


