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
    Person.find()
    .then(async (persons) => {
        msg = "Phonebook has info for "+persons.length+" people";
        res.status(200).send(msg);
    }).catch(err => {
        res.status(500).send({message: "Some error occurred while fetching persons." + err.message})
    });
};

exports.getPersonById = (req, res) => {
    let id = req.params.id;

    Person.findById(id)
    .then(async (person) => {  
        if (!person)
            res.status(404).send({ message: "Not found Person with id " + id });
        else res.status(200).send(person);
    }).catch(err => {
        res.status(500).send({message: "Some error occurred while fetching person." + err.message})
    });
};

exports.deletePersonById = (req, res) => {
    let id = req.params.id;

    Person.findByIdAndRemove(id).then(_data => { 
        if (!_data) {
            return res.status(404).send({
                message:"Cannot delete Person with id="+id+". Maybe Person was not found!"
            });
        } else {
            return res.status(200).send({
                message:"Person deleted successfully"
            });
        }
    })
    .catch(err => {
        res.status(500).send({message: err.message})
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

exports.updatePersonById = (req, res) => {
    let id = req.params.id;
    
    Person.update({
        number: number
    },{
        where: {id: id}
    })
    Person.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            return res.status(404).send({
                message:"Cannot delete Person with id="+id+". Maybe Person was not found!"
            });
        } else {
            return res.status(200).send({
                message:"Person updated successfully"
            });
        }
    })
    .catch(err => {
        res.status(500).send({message: "Some error occurred while updating person."+err.message})
    });
};