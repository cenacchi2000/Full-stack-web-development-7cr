const db        = require("../models");
const Blog      = db.blogs;
const listHelper  = require('../utils/list_helper');

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

exports.test1 = (req, res) => {
    const blogs = []
 
    const result = listHelper.dummy(blogs);
    res.status(200).send({result: result});
};

exports.test2 = (req, res) => {
    Blog.find()
    .then(async (blogs) => {
        const result = listHelper.totalLikes(blogs);
        res.status(200).send({likes: result});
    }).catch(err => {
        res.status(500).send({message: "Some error occurred while fetching blogs." + err.message})
    });
};