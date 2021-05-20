var express = require("express");
var router = express.Router();
const ReleaseModel = require("../models/Release.Model");
const UserModel = require("../models/User.Model");
const uploader = require("./../config/cloudinary");

/* GET playlist page. */
router.get("/:id", async function (req, res, next) {
  try{
  
  const foundRelease = await ReleaseModel.findById(req.params.id).populate("userId")
  console.log(foundRelease);
  res.render("release", {
    release: foundRelease,
    isOwner : foundRelease.userId._id.toString() == req.session.currentUser._id
  });
  }catch(error){
    next(error)
  }
}); 

router.post("/", uploader.single("image"), async (req, res, next) => {
  const newRelease = {...req.body };
  
  const embedLink = newRelease.youtubeLink.replace("watch?v=","embed/");
  newRelease.youtubeLink = embedLink;

  if (!req.file) newRelease.image = undefined;
  else newRelease.image = req.file.path;

  newRelease.userId = req.session.currentUser._id 
  
  try {
    await ReleaseModel.create(newRelease);
    res.redirect("/profile")
  } catch (err) {
    next(err);
  }
});

module.exports = router;
