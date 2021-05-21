require("dotenv").config();
require("./config/mongodb");

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes/index");
const profileRouter = require("./routes/profile");
const authRouter = require("./routes/auth");
const releaseRouter = require("./routes/release");
const app = express();
const session = require("express-session");
const MongoStore = require("connect-mongo");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));



// mongodb new session
app.use(session({
  secret: process.env.SESSION_SECRET,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));

app.locals.site_url = process.env.SITE_URL;

//middlewares : loginStatus
app.use(require("./middlewares/loginStatus"));


app.use("/", indexRouter);
app.use("/profile", profileRouter);
app.use("/release", releaseRouter);
app.use("/auth", authRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  console.log(err)
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
