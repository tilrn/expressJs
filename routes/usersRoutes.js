var express = require("express");
var router = express.Router();
var usersController = require("../controllers/usersController.js");

/*
function requiresLogin(req, res, next) {
    console.log("auth!");
    if (req.session && req.session.userId) {
        return next();
    } else {
        var err = new Error("You must be logged in to view this page!");
        err.status = 401;
        return next(err);
    }
}
*/
/*
 * GET
 */
router.get("/login", usersController.showLogin);
router.get("/register", usersController.showRegister);
router.get("/all", usersController.list);
router.get("/profile", usersController.profile);
router.get("/logout", usersController.logout);
/*
 * GET
 */
router.get("/:id", usersController.show);
/*
 * POST
 */
router.post("/", usersController.create);
router.post("/login", usersController.login);




/*
 * PUT
 */
router.put("/:id", usersController.update);

/*
 * DELETE
 */
router.delete("/:id", usersController.remove);

module.exports = router;
