var express = require("express");
var router = express.Router();
const ReleaseModel = require("../models/Release.Model");
const UserModel = require("../models/User.Model");
const uploader = require("./../config/cloudinary");

/* GET playlist page. */
router.get("/:id", async function (req, res, next) {
  const foundRelease = await ReleaseModel.findById(req.params.id);
  // const foundUser = await UserModel.model
  console.log(foundRelease);

  res.render("release", {
    release: foundRelease,
  });
}); 

router.post("/",uploader.single("image"), async (req, res, next) => {
  const newRelease = {...req.body };
  
  const embedLink = newRelease.youtubeLink.replace("watch?v=","embed/");
  newRelease.youtubeLink = embedLink;

  newRelease.userId = req.session.currentUser._id 
  
  try {
    await ReleaseModel.create(newRelease);
    res.redirect("/profile")
  } catch (err) {
    next(err);
  }
});

module.exports = router;
