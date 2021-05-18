module.exports = function loginStatus(req, res, next) {
  if (!req.session.currentUser) {
    res.locals.currentUser = undefined;
    res.locals.isLoggedIn = false;
    console.log("User unconnect");
  } else {
    res.locals.currentUser = req.session.currentUser;
    res.locals.isLoggedIn = true;
    console.log("User connect");
  }
  next();
};
