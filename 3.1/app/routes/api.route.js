module.exports = app => {
    const controller = require("../controllers/api.controller");
    const router = require("express").Router();

    router.get("/persons", controller.getPersons);

    app.use("/api/", router);
}