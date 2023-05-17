var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController.js');

function requiresLogin(req, res, next) {
    console.log("auth!");
    if (req.session && req.session.userId) {
        var err = new Error("you must be logged in to view this page!");
        err.status = 401;
        return next(err);
    }
}


router.get("/login", userController.showLogin);
router.get("/register", userController.showRegister);
router.post("/login", userController.login);
router.get("/profile", userController.profile);
router.get("/logout", userController.logout);
//router.get("/dodaj",requiresLogin,userController.dodaj)
/*
 * GET
 */
router.get('/all', userController.list);

/*
 * GET
 */
router.get('/:id', userController.show);

/*
 * POST
 */
router.post('/', userController.create);

/*
 * PUT
 */
router.put('/:id', userController.update);

/*
 * DELETE
 */
router.delete('/:id', userController.remove);

module.exports = router;
