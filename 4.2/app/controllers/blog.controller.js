const db        = require("../models");
const Blog    = db.blogs;

require('dotenv').config();

let env = process.env;

exports.getBlogs = (req, res) => {
    Blog.find()
    .then(async (blogs) => {
        res.status(200).send(blogs);
    }).catch(err => {
        res.status(500).send({message: "Some error occurred while fetching blogs." + err.message})
    });
};

exports.getInfo = (req, res) => {
    const blog = new Blog(req.body)
 
    blog
        .save()
        .then(blogs => {
            res.status(200).send(blogs);
        }).catch(err => {
            res.status(500).send({message: "Some error occurred while inserting blogs." + err.message})
        });
};