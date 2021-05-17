var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User.Model");

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

router.post("/signin", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const findUser = await User.findOne({ username: username, email: email }); // <= correct ?
    if (!findUser) {
      res.redirect("/auth/signin");
      // add flashError
    } else {
      const samePassword = bcrypt.compareSync(password, foundUser.password);
      if (!samePassword) {
        res.redirect("/auth/signin");
        // add flashError
      } else {
        const userObject = foundUser.toObject();
        delete userObject.password;
        req.session.currentUser = userObject;
        // add flashValided
        res.redirect("/");
      }
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
