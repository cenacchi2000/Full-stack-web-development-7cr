const db        = require("../models");
const Person    = db.persons;

require('dotenv').config();

let env = process.env;
const fs = require("fs");

exports.getPersons = (req, res) => {
    Person.find()
    .then(async (data) => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({message: "Some error occurred while fetching persons." + err.message})
    });
};

exports.getInfo = (req, res) => {
    fs.readFile("./app/db/db.json", "utf8", (err, jsonString) => {
        if (err) {
            res.status(500).send({message: "Some error occurred " + err})
        }
        let data = JSON.parse(jsonString);
        let msg = "Phonebook has info for "+data.length+" people";
        res.status(200).send(msg);
    });
};

exports.getPersonById = (req, res) => {
    let id = req.params.id;

    fs.readFile("./app/db/db.json", "utf8", (err, jsonString) => {
        if (err) {
            res.status(500).send({message: "Some error occurred " + err})
        }
        let data = JSON.parse(jsonString);

        let _data = null;
        data.forEach((item) => {
            if(item.id == id){
                _data = item;
            }
        });

        res.status(200).send(_data);
    });
};

exports.deletePersonById = (req, res) => {
    let id = req.params.id;

    fs.readFile("./app/db/db.json", "utf8", (err, jsonString) => {
        if (err) {
            res.status(500).send({message: "Some error occurred " + err})
        }
        let persons = JSON.parse(jsonString);
        let index = persons.findIndex(row => row.id == id);
		persons.splice(index, 1);

        const _persons = JSON.stringify(persons);
        fs.writeFile('./app/db/db.json', _persons, err => {
            if (err) {
                res.status(500).send({message: "Some error occurred " + err})
            } else {
                res.status(200).send({message: "Person deleted successfully."});
            }
        })
    });
};

exports.savePersons = (req, res) => {
    let name = req.body.name;
    let number = req.body.number;

    if(name === ''){
        return res.status(400).send({
            message:"Name can not be blank"
        });
    }
    else if(number === ''){
        return res.status(400).send({
            message:"Number can not be blank"
        });
    }else{
        const person = new Person({
            name: name,
            number: number,
        });  
        
        person
        .save(person)
        .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                    err.message || "Some error occurred while creating the Person."
                });
            });
    }
};