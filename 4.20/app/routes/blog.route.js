module.exports = app => {
    const controller = require("../controllers/blog.controller");
    const router = require("express").Router();
    const verify = require('./verifyToken');

    router.get("/blogs",  verify, controller.getBlogs);
    router.post("/blogs",  verify, controller.saveBlogs);
    router.get("/blog/:id",  verify, controller.getBlogById);
    router.put("/blog/:id",  verify, controller.updateBlogById);
    router.delete("/blog/:id",  verify, controller.deleteBlogById);

    app.use("/api/", router);
}