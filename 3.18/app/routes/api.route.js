module.exports = app => {
    const controller = require("../controllers/api.controller");
    const router = require("express").Router();

    router.get("/persons", controller.getPersons);
    router.post("/persons", controller.savePersons);
    router.get("/info", controller.getInfo);
    router.get("/person/:id", controller.getPersonById);
    router.put("/person/:id", controller.updatePersonById);
    router.delete("/person/:id", controller.deletePersonById);

    app.use("/api/", router);
}