module.exports = app => {
    const controller = require("../controllers/api.controller");
    const router = require("express").Router();

    router.get("/persons", controller.getPersons);
    router.get("/info", controller.getInfo);
    router.get("/person/:id", controller.getPersonById);
    router.delete("/person/:id", controller.deletePersonById);

    app.use("/api/", router);
}