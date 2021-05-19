var express = require("express");
var router = express.Router();
var UserModel = require("../models/User.Model");
var ReleaseModel = require("../models/Release.Model");


// GET all releases ?

router.get("/", async (req, res, next) => {
  try {
    res.render("profile", { releases: await ReleaseModel.find() });
  } catch (err) {
    next(err);
  }
});

// GET - create one release form
router.get("/create", function (req, res, next) {
  try {
    res.render("create/create-release");
  } catch (err) {
    next(err);
  }
});

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
router.post("/release", async (req, res, next) => {
  const newRelease = {...req.body };
  console.log(newRelease)
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
    console.log(releaseToUpdate)
    await ReleaseModel.findByIdAndUpdate(req.params.id, releaseToUpdate);
    res.redirect("/profile");
  } catch (err) {
    next(err);
  }
});


/* GET user profile. */

router.get("/:id", async function (req, res, next) {
  try {
    const foundUser = await UserModel.findById(req.params.id);
    console.log(foundUser);
    res.render("profile", {
      user: foundUser,
      public: true,
    });
  } catch (err) {
    next(err);
  }
});



// router.get("/delete/:id", function (req, res, next) {
//   try {
//     res.render("/update-playlist");
//   } catch (err) {
//     next(err);
//   }
// });

// // GET - create one artist (form)
// router.get("/create", async (req, res, next) => {
//   res.render("dashboard/artistCreate");
// });

// // GET - update one artist (form)
// router.get("/update/:id", async (req, res, next) => {
//   try {
//     res.render("dashboard/artistUpdate", await ArtistModel.findById(req.params.id));
//   } catch (err) {
//     next(err);
//   }
// });

// // GET - delete one artist
// router.get("/delete/:id", async (req, res, next) => {
//   try {
//     await ArtistModel.findByIdAndRemove(req.params.id);
//     res.redirect("/dashboard/artist");
//   } catch (err) {
//     next(err);
//   }
// });

// // POST - create one artist
// router.post("/", uploader.single("picture"), async (req, res, next) => {
//   const newArtist = { ...req.body };

//   if (!req.file) newArtist.picture = undefined;
//   else newArtist.picture = req.file.path;
//   newArtist.isBand = req.body.isBand === "on";

//   try {
//     await ArtistModel.create(newArtist);
//     res.redirect("/dashboard/artist");
//   } catch (err) {
//     next(err);
//   }
// });

// // POST - update one artist
// router.post("/:id",
//   uploader.single("picture"),
//   async (req, res, next) => {
//     try {
//       const artistToUpdate = { ...req.body };
//       if (req.file) artistToUpdate.picture = req.file.path;
//       artistToUpdate.isBand = req.body.isBand === "on";

//       await ArtistModel.findByIdAndUpdate(req.params.id, artistToUpdate);
//       res.redirect("/dashboard/artist");
//     } catch (err) {
//       next(err);
//     }
//   }
// );

module.exports = router;
