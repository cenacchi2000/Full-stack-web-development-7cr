const fs = require("fs");

exports.getPersons = (req, res) => {
    fs.readFile("./app/db/db.json", "utf8", (err, jsonString) => {
        if (err) {
            res.status(500).send({message: "Some error occurred " + err})
        }
        let data = JSON.parse(jsonString);
        res.status(200).send(data);
    });
};

exports.getInfo = (req, res) => {
    fs.readFile("./app/db/db.json", "utf8", (err, jsonString) => {
        if (err) {
            res.status(500).send({message: "Some error occurred " + err})
        }
        let data = JSON.parse(jsonString);
        msg = "Phonebook has info for "+data.length+" people";
        res.status(200).send(msg);
    });
};