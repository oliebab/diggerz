var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");

/* GET auth/signIn listing. */
router.get("/signin", (req, res, next) => {
  res.render("auth/signin");
});

/* GET auth/signUp listing. */
router.get("/signup", async (req, res, next) => {
  res.render("auth/signup");
});

/* GET auth/signOut listing => redirect Home. */
router.get("/signout", async (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });
});

/* GET auth/signOut listing => redirect Home. */
/*
router.post("/signin", async (req,res,start)=>{
    const { username , password}
})



*/
module.exports = router;
