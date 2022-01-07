const db        = require("../models");
const Blog      = db.blogs;
const listHelper  = require('../utils/list_helper');

require('dotenv').config();

let env = process.env;

exports.getBlogs = (req, res) => {
    Blog.find()
    .then(async (blogs) => {
        let total_blogs = blogs.length;
        res.status(200).send(total_blogs);
    }).catch(err => {
        res.status(500).send({message: "Some error occurred while fetching blogs." + err.message})
    });
};

exports.getBlogById = (req, res) => {
    let id = req.params.id;

    Blog.findById(id)
    .then(async (blog) => {  
        if (!blog)
            res.status(404).send({ message: "Not found blog with id " + id });
        else res.status(200).send(blog);
    }).catch(err => {
        res.status(500).send({message: "Some error occurred while fetching blog." + err.message})
    });
};

exports.saveBlogs = (req, res) => {
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

exports.test3 = (req, res) => {
    Blog.find()
    .then(async (blogs) => {
        const result = listHelper.favoriteBlog(blogs);
        res.status(200).send(result);
    }).catch(err => {
        res.status(500).send({message: "Some error occurred while fetching blogs." + err.message})
    });
};

exports.test5 = (req, res) => {
    Blog.find()
    .then(async (blogs) => {
        const result = listHelper.mostBlogs(blogs);
        res.status(200).send(result);
    }).catch(err => {
        res.status(500).send({message: "Some error occurred while fetching blogs." + err.message})
    });
};

exports.test4 = (req, res) => {
    Blog.find()
    .then(async (blogs) => {
        const result = listHelper.favoriteBlog(blogs);
        res.status(200).send(result);
    }).catch(err => {
        res.status(500).send({message: "Some error occurred while fetching blogs." + err.message})
    });
};