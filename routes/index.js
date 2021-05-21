var express = require("express");
var router = express.Router();
const UserModel = require("../models/User.Model");
const ReleaseModel = require("../models/Release.Model");
const protectRoute = require("./../middlewares/protectPrivateRoute");

/* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("index");
// });

/* Get Profile when user is logged*/
router.get("/profile", protectRoute, async (req, res, next) => {
 try {
  const foundRelease = await ReleaseModel.find({userId: req.session.currentUser._id});
  console.log(req.session.currentUser._id)
  res.render("profile", {releases: foundRelease });
} catch (err) {
  next(err);
}
});


router.get("/", async (req, res, next) => {
  try {
    console.log(req.query)
    // trouve moi toutes les releases dans la db
    // une fois que t'as trouvé la realse

    // render la vue index en passant les releases

    const releases = await ReleaseModel.find().limit(100);

    console.log(releases);

    res.render("index", { releases: releases });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
