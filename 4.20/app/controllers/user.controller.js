const { models } = require("mongoose");
const db        = require("../models");
const User      = db.users;
const bcrypt    = require("bcryptjs");
const jwt       = require('jsonwebtoken');

exports.saveUser = (req, res) => {
    const name = req.body.username;
    const username = req.body.username;
    const password = req.body.password;

    if(name){
        return res.status(400).send({
            message:"Name can not be blank"
        });
    }else if(username){
        return res.status(400).send({
            message:"Username can not be blank"
        });
    }else if(username.length < 3){
        return res.status(400).send({
            message:"username "+username+" is shorter than the minimum allowed length (3)"
        });
    }else if(password){
        return res.status(400).send({
            message:"Password can not be blank"
        });
    }else if(password.length < 3){
        return res.status(400).send({
            message:"password "+password+" is shorter than the minimum allowed length (3)"
        });
    }else{
        User.findOne({ username: username })
        .then(async (data) => {  
            if(data){
                res.status(403).send({message: "username must be unique."})
            }else{
				const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                const user = new User({
                    name: name,
                    username: username,
                    password: hashedPassword,
                })
                
                user
                    .save()
                    .then(_data => {
                        return gerUserCreateResponse(data, res);
                    }).catch(err => {
                        res.status(500).send({message: "Some error occurred while inserting new user." + err.message})
                    });
            }
        }).catch(err => {
            res.status(500).send({message: "Some error occurred while fetching user." + err.message})
        });
    }
};

exports.login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    if(username === ''){
        return res.status(400).send({
            message:"Username can not be blank"
        });
    }else if(password === ''){
        return res.status(400).send({
            message:"Password can not be blank"
        });
    }else{
        User.findOne({ username: username })
        .then(async (data) => {  
            if(data){
                const validPassword = await bcrypt.compare(password, data.password);
                if(!validPassword)
                    return res.status(400).send({
                        message:"Invalid password or user does not exist"
                    });
                else{
                    return gerUserCreateResponse(data, res);
                }
            }else{
				return res.status(400).send({
					message:"Invalid username or user does not exist"
				});
            }
        }).catch(err => {
            res.status(500).send({message: "Some error occurred while fetching user." + err.message})
        });
    }
};

function gerUserCreateResponse(data, res){
    const token = jwt.sign({id:data.id, username: data.username, name: data.name}, 'SECRET_KEY');
	
    const user = {
        id: data.id,
        name: data.name,
        username: data.username,
    }

    return res.status(200).header('Authorization').send({
        accessToken: token,
        user: user
    });
}