const db        = require("../models");
const Blog      = db.blogs;
const listHelper  = require('../utils/list_helper');

require('dotenv').config();

let env = process.env;

exports.getBlogs = (req, res) => {
    Blog.find()
    .then(async (blogs) => {
        let total_blogs = blogs.length;
        res.status(200).send({total_blogs: total_blogs, blogs: blogs});
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
    const title = req.body.title;
    const author = req.body.author;
    const likes = req.body.likes;
    const url = req.body.url;

    if(title){
        return res.status(400).send({
            message:"Title can not be blank"
        });
    }
    else if(url){
        return res.status(400).send({
            message:"Url can not be blank"
        });
    }
    else{
        if(!likes){
            likes = 0;
        }

        const blog = new Blog({
            title: title,
            author: author,
            url: url,
            likes: likes,
        })
        
        Blog.find()
        .then(async (blogs) => {
            let total_blogs = blogs.length;
            blog
            .save()
            .then(_blogs => {
                Blog.find()
                .then(async (new_blogs) => {
                    let new_total_blogs = new_blogs.length;
                    let increased = new_total_blogs - total_blogs;
                    res.status(200).send({increased: increased, blogs: blogs});
                }).catch(err => {
                    res.status(500).send({message: "Some error occurred while fetching blogs." + err.message})
                });
            }).catch(err => {
                res.status(500).send({message: "Some error occurred while inserting blogs." + err.message})
            });
        }).catch(err => {
            res.status(500).send({message: "Some error occurred while fetching blogs." + err.message})
        });
    }
};

exports.deleteBlogById = (req, res) => {
    let id = req.params.id;

    Blog.findByIdAndRemove(id).then(_data => { 
        if (!_data) {
            return res.status(404).send({
                message:"Cannot delete blog with id="+id+". Maybe blog was not found!"
            });
        } else {
            return res.status(200).send({
                message:"Blog deleted successfully"
            });
        }
    })
    .catch(err => {
        res.status(500).send({message: err.message})
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

exports.test4 = (req, res) => {
    Blog.find()
    .then(async (blogs) => {
        const result = listHelper.mostBlogs(blogs);
        res.status(200).send(result);
    }).catch(err => {
        res.status(500).send({message: "Some error occurred while fetching blogs." + err.message})
    });
};

exports.test5 = (req, res) => {
    Blog.find()
    .then(async (blogs) => {
        const result = listHelper.favoriteBlog(blogs);
        res.status(200).send(result);
    }).catch(err => {
        res.status(500).send({message: "Some error occurred while fetching blogs." + err.message})
    });
};