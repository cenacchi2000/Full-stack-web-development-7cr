module.exports = app => {
    const controller = require("../controllers/blog.controller");
    const router = require("express").Router();

    router.get("/blogs", controller.getBlogs);
    router.post("/blogs", controller.saveBlogs);

    app.use("/api/", router);
}