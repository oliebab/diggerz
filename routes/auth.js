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
    const findUser = await User.findOne({ userName: username}); // <= correct ?
    if (!findUser) {
        console.log('1')
      res.redirect("/auth/signin");
      // add flashError
    } else {
      const samePassword = bcrypt.compareSync(password, findUser.password);
      if (!samePassword) {
        console.log('2')
        res.redirect("/auth/signin");
        
        // add flashError
      } else {
        console.log('3')
        const userObject = findUser.toObject();
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

router.post("/signup", async (req, res, next) => {
  try {
    const newUser = { ...req.body };
    const foundUser = await User.findOne({ email: newUser.email });
    if (foundUser) {
      res.redirect("/auth/signin");
    } else {
      const hashedPassword = bcrypt.hashSync(newUser.password, 10);
      newUser.password = hashedPassword;
      await User.create(newUser);
      res.redirect("/");
    }
  } catch (err) {
    var errorMsg = "";
    for (field in err.errors) {
      errorMsg += err.errors[field].message + "\n";
    }
    res.redirect("/signup");
  }
});

module.exports = router;
