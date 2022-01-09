const express = require("express"),
    cors = require('cors'),
    morgan = require('morgan'),
    bodyParser = require("body-parser"),
    cron = require('node-cron'),
    app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Request-Method", "POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();


});

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('build'));
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :req[content-length] - :response-time ms :body'));


app.use(bodyParser.urlencoded({
    extended: true
}));

//include routes
const router = require("./app/routes")(app);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to Phonebook API"
    })
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})