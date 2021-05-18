var express = require("express");
var router = express.Router();
const ReleaseModel = require("../models/Release.Model");
var PlaylistModel = require("../models/Playlist.Model");

/* GET playlist page. */
router.get("/:id", async function (req, res, next) {
  const foundPlayList = await PlaylistModel.findById(req.params.id).populate(
    "releases userId"
  );
  console.log(foundPlayList);

  res.render("playlist", {
    playlist: foundPlayList,
  });
}); //get play list by id

router.post("/playlist", async (req, res, next) => {
  const newPlaylist = { ...req.body };
  console.log(newPlaylist);
  try {
    await PlaylistModel.create(newPlaylist);
    res.redirect("/create/create-release")
  } catch (err) {
    next(err);
  }
});

router.post("/release", async (req, res, next) => {
  const newRelease = { ...req.body };
 console.log(newRelease)
  try {
    await ReleaseModel.create(newRelease);
    res.redirect("/profile")
  } catch (err) {
    next(err);
  }
});


/* /playlist/{{playlist._id}}/release */
//router.post("/playlist/:id/release")
module.exports = router;
