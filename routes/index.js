var express = require("express");
var router = express.Router();
const User = require("../models/User.Model");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});


/* Get Profile when user is logged*/
router.get("/profile", (req, res, next) => {
  res.render("profile");
});


router.post("/release", (req,res,next) =>{
  res.render("profile");
})



module.exports = router;
