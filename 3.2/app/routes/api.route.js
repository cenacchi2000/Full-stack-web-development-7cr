module.exports = app => {
    const controller = require("../controllers/api.controller");
    const router = require("express").Router();

    router.get("/persons", controller.getPersons);
    router.get("/info", controller.getInfo);

    app.use("/api/", router);
}