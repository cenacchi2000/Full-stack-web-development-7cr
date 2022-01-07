const express = require("express"),
    bodyParser = require("body-parser"),
    cors = require("cors"),
    app = express();
    
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Request-Method", "POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Include models
const db = require("./app/models");

//include routes
const router = require("./app/routes")(app);

db.sequelize.sync().then(function(){
    console.log("DB connected successfully");
}).catch(function(err){
    console.log("Unable to connect DB" + err);
})

app.get("/", (req, res) =>{
    res.status(200).json({message: "Welcome to Phonebook API"})
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
})