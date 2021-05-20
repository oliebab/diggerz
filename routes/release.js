var express = require("express");
var router = express.Router();
const ReleaseModel = require("../models/Release.Model");
const UserModel = require("../models/User.Model");
const uploader = require("./../config/cloudinary");

/* GET playlist page. */
router.get("/:id", async function (req, res, next) {
  const foundRelease = await ReleaseModel.findById(req.params.id);
  console.log(foundRelease);

  res.render("release", {
    release: foundRelease,
  });
}); //get play list by id

router.post("/",uploader.single("image"), async (req, res, next) => {
  const newRelease = {...req.body };
  console.log(newRelease);
  console.log(newRelease.youtubeLink);


  const embedLink = newRelease.youtubeLink.replace("watch?v=","embed/");
  newRelease.youtubeLink = embedLink;

  console.log(embedLink)



  // const embedLink = youtubeLink.replace("watch?v=","embed/");
  // newRelease.youtubeLink = embedLink;
  

  // modifier le lien
  newRelease.userId = req.session.currentUser._id 
  // newRelease.youtubeLink = "toto" // mettre le nouveau lien;
  try {
    await ReleaseModel.create(newRelease);
    res.redirect("/profile")
  } catch (err) {
    next(err);
  }
});

// router.post("/release", async (req, res, next) => {
//   const newRelease = { ...req.body };
//  console.log(newRelease)
//   try {
//     await ReleaseModel.create(newRelease);
//     res.redirect("/profile")
//   } catch (err) {
//     next(err);
//   }
// });


/* /playlist/{{playlist._id}}/release */
//router.post("/playlist/:id/release")
module.exports = router;
