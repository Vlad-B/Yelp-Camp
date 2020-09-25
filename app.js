require('dotenv').config();

const express        = require("express"),
 	  app            = express(),
 	  bodyParser     = require("body-parser"),
	  flash          = require("connect-flash"),
 	  mongoose       = require("mongoose"),
	  passport       = require("passport"),
	  methodOverride = require("method-override"),
	  LocalStrategy  = require("passport-local"),
	  Campground     = require("./models/campground"),
	  seedDB         = require("./seeds"),
	  User           = require("./models/user"),
	  Comment        = require("./models/comment");

//Requiring routes
const commentRoutes    = require("./routes/comments"),
	  campgroundRoutes = require("./routes/campgrounds"),
	  indexRoutes      = require("./routes/index");


mongoose.connect(process.env.DATABASEURL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
})
	.then(() => console.log("Connected to DB"))
	.catch(err => console.log(err.message));

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(flash());
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
// seedDB();
app.locals.moment = require('moment');
// PASSPORT CONFIG
app.use(require("express-session")({
	secret: "bAss is nAss",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App is running on port ${ PORT }`);
});