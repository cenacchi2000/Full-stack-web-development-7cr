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