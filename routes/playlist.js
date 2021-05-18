var express = require("express");
var router = express.Router();
const toto = require("../models/Release.Model");
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

router.post("/playlist", (req, res, next) => {
  console.log(req.body);
});



router.post("/playlist/:id/release")
module.exports = router;
