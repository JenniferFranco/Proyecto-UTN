var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

require("dotenv").config();
var pool = require("./models/bd");

var session = require("express-session");
var fileUpload = require("express-fileupload");

var indexRouter = require("./routes/index");
var loginRouter = require("./routes/admin/login");

var carpasRouter = require("./routes/carpas");
var eventosRouter = require("./routes/eventos");
var promocionesRouter = require("./routes/promociones");
var adminRouter = require("./routes/admin/promociones");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "hsdhuybl1k3664jas", //20 caracteres como minimo
    resave: false,
    saveUninitialized: true,
  })
);

secured = async (req, res, next) => {
  try {
    console.log(req.session.id_usuario);
    if (req.session.id_usuario) {
      next();
    } else {
      res.redirect("/admin/login");
    }
  } catch (error) {
    console.log(error);
  }
};

app.use(fileUpload ({
  useTempFiles: true,
  tempFileDir: '/tmp'
}));

app.use("/", indexRouter);
app.use("/carpas", carpasRouter);
app.use("/eventos", eventosRouter);
app.use("/promociones", promocionesRouter);
app.use("/admin/login", loginRouter);
app.use("/admin/promociones", secured, adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
