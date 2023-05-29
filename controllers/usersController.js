var UsersModel = require("../models/usersModel.js");
var bcrypt = require("bcrypt");
var config = require("../config/auth.config.js");
/**
 * usersController.js
 *
 * @description :: Server-side logic for managing userss.
 */
module.exports = {
    /**
     * usersController.list()
     */
    list: function (req, res) {
        UsersModel.find(function (err, userss) {
            if (err) {
                return res.status(500).json({
                    message: "Error when getting users.",
                    error: err,
                });
            }

            return res.json(userss);
        });
    },

    /**
     * usersController.show()
     */
    showLogin: function (req, res) {
        res.render("users/login");
    },
    showRegister: function (req, res) {
        res.render("users/register");
    },
    show: function (req, res) {
        var id = req.params.id;

        UsersModel.findOne({ _id: id }, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: "Error when getting users.",
                    error: err,
                });
            }

            if (!user) {
                return res.status(404).json({
                    message: "No such users",
                });
            }
            user.password = "";
            return res.json(user);
        });
    },

    /**
     * usersController.create()
     */
    create: function (req, res) {
        var user = new UsersModel({
            username: req.body.username,
            password: req.body.password
        });

        user.save(function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: "Error when creating users",
                    error: err,
                });
            }
            //return res.render("users/login");
            return res.render("users/login");
        });

    },

    /**
     * usersController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        UsersModel.findOne({ _id: id }, function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: "Error when getting users",
                    error: err,
                });
            }

            if (!users) {
                return res.status(404).json({
                    message: "No such users",
                });
            }

            users.username = req.body.username
                ? req.body.username
                : users.username;
            users.password = req.body.password
                ? req.body.password
                : users.password;

            users.save(function (err, users) {
                if (err) {
                    return res.status(500).json({
                        message: "Error when updating users.",
                        error: err,
                    });
                }
                users.password = "";
                return res.json(users);
            });
        });
    },

    /**
     * usersController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        UsersModel.findByIdAndRemove(id, function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: "Error when deleting the users.",
                    error: err,
                });
            }

            return res.status(204).json();
        });
    },

    login: function (req, res, next) {
        console.log(req.body.username);
        console.log(req.body.password);
        UsersModel.authenticate(req.body.username, req.body.password, function (error, user) {
            if (error || !user) {
                var err = new Error("Wrong username of password");
                err.status = 401;
                return next(err);
            } else {
                console.log(user);

                req.session.userId = user._id;
                return res.redirect("users/profile", user);
            }
        })
    },
    profile: function (req, res, next) {
        UsersModel.findById(req.session.userId)
            .exec(function (error, user) {
                if (error) {
                    return next(error);
                } else {
                    if (user === null) {
                        var err = new Error("Not authorized! Go back!");
                        err.status = 400;
                        return next(err);
                    } else {
                        res.render("express/views/users/profile.hbs", user);
                    }
                }
            });
    },

    logout: function (req, res, next) {
        if (req.session) {
            req.session.destroy(function (err) {
                if (err) {
                    return next(err);
                } else {
                    return res.redirect("/");
                }
            })
        }
    },
};
