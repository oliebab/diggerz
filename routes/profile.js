var express = require("express");
var router = express.Router();
var UserModel = require("../models/User.Model");
var ReleaseModel = require("../models/Release.Model");
const uploader = require("./../config/cloudinary");

// router.get("/", async (req, res, next) => {
//   try {
//     const lastReleases = await ReleaseModel.find();
//     console.log(lastReleases).sort({ createdAt: -1 }).limit(12);

//     res.render("index", {
//       lastReleases,
//     });
//   } catch (err) {
//     next(err);
//   }
// });

// GET - create one release form
router.get("/create", function (req, res, next) {
  try {
    res.render("create/create-release");
  } catch (err) {
    next(err);
  }
});
/*GET update profil*/
router.get("/update-profile", async (req, res, next) => {
  try {
    res.render("update/update-profile");
  } catch (err) {
    next(err);
  }
});

/*post Mod update profil*/
router.post(
  "/update-profile",
  uploader.single("image"),
  async (req, res, next) => {
    try {
      const userToUpdate = { ...req.body };
      if (!req.file) userToUpdate.picture = undefined;
      else userToUpdate.picture = req.file.path;
      console.log(userToUpdate);
      const updatedUser = await UserModel.findByIdAndUpdate(
        req.session.currentUser._id,
        userToUpdate,
        { new: true }
      );

      const userToObj = updatedUser.toObject();
      delete userToObj.password;

      req.session.currentUser = userToObj;
      res.redirect("/profile");
    } catch (err) {
      next(err);
    }
  }
);

// GET - update one artist (form)
router.get("/update/:id", async (req, res, next) => {
  try {
    res.render("update/update-release", {
      release: await ReleaseModel.findById(req.params.id),
    });
  } catch (err) {
    next(err);
  }
});

// GET - delete one artist
router.get("/delete/:id", async (req, res, next) => {
  try {
    await ReleaseModel.findByIdAndRemove(req.params.id);
    res.redirect("/profile");
  } catch (err) {
    next(err);
  }
});

// // POST - create one release
router.post("/release", uploader.single("image"), async (req, res, next) => {
  const newRelease = { ...req.body };
  if (!req.file) newRelease.image = undefined;
  else newRelease.image = req.file.path;
  console.log(newRelease);
  try {
    await ReleaseModel.create(newRelease);
    res.redirect("/profile");
  } catch (err) {
    next(err);
  }
});

// POST - update one artist
router.post("/release/:id", async (req, res, next) => {
  try {
    const releaseToUpdate = { ...req.body };
    console.log(releaseToUpdate);
    await ReleaseModel.findByIdAndUpdate(req.params.id, releaseToUpdate);
    res.redirect("/profile");
  } catch (err) {
    next(err);
  }
});

/* GET user profile. */

router.get("/:id", async function (req, res, next) {
  console.log(req.params.id);
  try {
    const foundUser = await UserModel.findById(req.params.id);

    const foundRelease = await ReleaseModel.find({ userId: req.params.id });

    res.render("profile", {
      user: foundUser,
      releases: foundRelease,
      public: true,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
