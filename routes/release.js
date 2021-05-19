var express = require("express");
var router = express.Router();
const ReleaseModel = require("../models/Release.Model");
const UserModel = require("../models/User.Model");

/* GET playlist page. */
router.get("/:id", async function (req, res, next) {
  const foundRelease = await ReleaseModel.findById(req.params.id);
  console.log(foundRelease);

  res.render("release", {
    release: foundRelease,
  });
}); //get play list by id

router.post("/", async (req, res, next) => {
  const newRelease = {...req.body };
  console.log(newRelease);
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
