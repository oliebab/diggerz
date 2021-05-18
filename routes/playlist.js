var express = require("express");
var router = express.Router();

/* GET playlist page. */
router.get("/:id", function (req, res, next) {
  res.render("playlist");
}); //get play list by id




module.exports = router;