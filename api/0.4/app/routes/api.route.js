module.exports = app => {
    const controller = require("../controllers/api.controller");
    const router = require("express").Router();

    router.get("/notes", controller.getNotes);

    app.use("/api/", router);
}