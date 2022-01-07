module.exports = app => {
    const userController = require("../controllers/user.controller");
    const userRouter = require("express").Router();

    userRouter.post("/login", userController.login);
    userRouter.post("/users", userController.saveUser);

    app.use("/api", userRouter);
}