const fs = require("fs");

exports.getNotes = (req, res) => {
    fs.readFile("./app/db/db.json", "utf8", (err, jsonString) => {
        if (err) {
            res.status(500).send({message: "Some error occurred " + err})
        }
        let data = JSON.parse(jsonString);
        res.status(200).send(data);
    });
};

exports.saveNote = (req, res) => {
    let note = req.body.note;

    fs.readFile("./app/db/db.json", "utf8", (err, jsonString) => {
        if (err) {
            res.status(500).send({message: "Some error occurred " + err})
        }
        let notes = JSON.parse(jsonString);

        let id = Math.round(Math.random(50)*100000);
        let newNote = {
            note: note
        };
        notes.push(newNote);

        const _notes = JSON.stringify(notes);
        fs.writeFile('./app/db/db.json', _notes, err => {
            if (err) {
                res.status(500).send({message: "Some error occurred " + err})
            } else {
                res.status(200).send({message: "Note created successfully."});
            }
        })
    });
};