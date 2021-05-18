var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

/* Get Profile when user is logged*/
router.get("/profile", (req,res,next) =>{
  res.render("profile");
})

/* Get Profile when user is logged*/
router.get("/playlist", (req,res,next) =>{
  res.render("playlist");
})
module.exports = router;
