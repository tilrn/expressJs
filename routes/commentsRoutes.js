var express = require("express");
var router = express.Router();
var commentsController = require("../controllers/commentsController.js");

/*
 * GET
 */
router.get("/all/:id", commentsController.list);

/*
 * GET
 */
router.get("/:id", commentsController.show);
/*
 * POST
 */
router.post("/", commentsController.create);

/*
 * PUT
 */
router.put("/:id", commentsController.update);

/*
 * DELETE
*
 */
router.delete("/:id", commentsController.remove);

module.exports = router;
