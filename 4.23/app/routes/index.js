module.exports = app => {
    require("../routes/blog.route")(app);
    require("../routes/user.route")(app);
}