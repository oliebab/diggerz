var express = require("express");
var router = express.Router();
var UserModel = require("../models/User.Model");
var PlaylistModel = require("../models/Playlist.Model");

router.get("/create", function (req, res, next) {
  try {
    res.render("create/create-playlist");
  } catch (err) {
    next(err);
  }
});

router.get("/create-release", function (req, res, next) {
  try {
    res.render("create/create-release");
  } catch (err) {
    next(err);
  }
});

// // POST - create one Playlist
router.post("/create", async (req, res, next) => {
  const newPlaylist = { ...req.body };
  try {
    await PlaylistModel.create(newPlaylist);
    res.redirect("/create-release");
  } catch (err) {
    next(err);
  }
});

router.get("/update/:id", function (req, res, next) {
  try {
    res.render("update/update-playlist");
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
