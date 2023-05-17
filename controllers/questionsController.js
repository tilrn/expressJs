var QuestionsModel = require("../models/questionsModel.js");
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
        QuestionsModel.find(function (err, questions) {
            if (err) {
                return res.status(500).json({
                    message: "Error when getting users.",
                    error: err,
                });
            }
            console.log(questions)
            return res.render("questions", questions);
            //return res.json(userss);
        });
    },

    /**
     * usersController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        QuestionsModel.findOne({ _id: id }, function (err, user) {
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
        QuestionsModel({
            username: req.body.username,
            password: req.body.password,
            points: 1000,
        });

        user.save(function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: "Error when creating users",
                    error: err,
                });
            }

            return res.status(201).json(user);
        });
    },

    /**
     * usersController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        QuestionsModel.findOne({ _id: id }, function (err, users) {
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
            users.points = req.body.points ? req.body.points : users.points;

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

        QuestionsModel.findByIdAndRemove(id, function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: "Error when deleting the users.",
                    error: err,
                });
            }

            return res.status(204).json();
        });
    },

    login: function (req, res) {
        console.log(req.body.username);
        try {
            QuestionsModel.findOne(
                { username: req.body.username },
                function (err, user) {
                    if (err) {
                        return res.status(500).json({
                            message: "Error getting user.",
                            error: err,
                        });
                    }

                    if (!user) {
                        return res.status(404).json({
                            message: "User not found.",
                        });
                    }

                    var passwordIsValid = bcrypt.compare(
                        req.body.password,
                        user.password
                    );
                    if (!passwordIsValid) {
                        return res.status(401).send({
                            accessToken: null,
                            message: "Invalid password!",
                        });
                    }

                    var token = jwt.sign({ id: user.id }, config.secret, {
                        expiresIn: 86400,
                    });

                    console.log(token);
                    return res.status(200).send({
                        id: user._id,
                        username: user.username,
                        accessToken: token,
                    });
                }
            );
        } catch (error) {
            res.status(400).json({ error });
        }
    },
};
