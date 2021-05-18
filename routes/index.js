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

/* Get Profile when user is logged*/
// router.post("/playlist", (req,res,next) =>{
//   res.render("playlist");
// })

// router.get("/signout", (req, res, next) => {
//   req.session.destroy((err) => {
//     res.redirect("/");
//   });
// });

module.exports = router;
