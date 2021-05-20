var express = require("express");
var router = express.Router();
const UserModel = require("../models/User.Model");
const ReleaseModel = require("../models/Release.Model");

/* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("index");
// });

/* Get Profile when user is logged*/
router.get("/profile", (req, res, next) => {
  res.render("profile");
});


router.get("/", async (req, res, next) => {
  try {
    // trouve moi toutes les releases dans la db
    // une fois que t'as trouvé la realse

    // render la vue index en passant les releases

    const releases = await ReleaseModel.find();

    console.log(releases);

    res.render("index", { releases: releases });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
