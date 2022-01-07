module.exports = app => {
    const controller = require("../controllers/blog.controller");
    const router = require("express").Router();

    router.get("/blogs", controller.getBlogs);
    router.post("/blogs", controller.saveBlogs);
    router.get("/blog/:id", controller.getBlogById);
    router.put("/blog/:id", controller.updateBlogById);
    router.delete("/blog/:id", controller.deleteBlogById);

    app.use("/api/", router);
}