module.exports = function protectPrivateRoute(req, res, next) {
    if (req.session.currentUser._id) next();
    else res.redirect("/auth/signin");
};