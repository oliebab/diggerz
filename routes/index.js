var express = require("express");
var router = express.Router();
const UserModel = require("../models/User.Model");
const ReleaseModel = require("../models/Release.Model");

/* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("index");
// });

/* Get Profile when user is logged*/
router.get("/profile", async (req, res, next) => {
 

  const foundRelease =await  ReleaseModel.find({userId: req.session.currentUser._id});
  res.render("profile", {releases: foundRelease });



});


router.get("/", async (req, res, next) => {
  try {
    console.log(req.query)
    // trouve moi toutes les releases dans la db
    // une fois que t'as trouvé la realse

    // render la vue index en passant les releases

    const releases = await ReleaseModel.find().limit(5);

    console.log(releases);

    res.render("index", { releases: releases });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
