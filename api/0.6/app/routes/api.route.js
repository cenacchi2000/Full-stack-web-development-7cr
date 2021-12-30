module.exports = app => {
    const controller = require("../controllers/api.controller");
    const router = require("express").Router();

    router.get("/notes", controller.getNotes);
    router.post("/notes", controller.saveNote);

    app.use("/api/", router);
}