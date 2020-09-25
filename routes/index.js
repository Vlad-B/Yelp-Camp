const express    = require("express");
const router     = express.Router();
const passport   = require("passport");
const User       = require("../models/user");

//Root route
router.get("/", (req, res) =>{
	res.render("landing");
});

// show register form
router.get("/register", (req, res) => {
	res.render("register", {page: "register"});
});
// handle sign up logic
router.post("/register", (req, res) => {
	let newUser = new User({username: req.body.username});
	// if(req.body.adminCode === "") {
	// 	newUser.isAdmin = true;
	// }
	User.register(newUser, req.body.password, (err, user) => {
		if(err){
			console.log(err);
			req.flash("error", err.message);
			return res.redirect("back");
		}
		passport.authenticate("local")(req, res, () => {
			req.flash("success", "Successfully Signed Up! Welcome to YelpCamp, " + user.username);
			res.redirect("/campgrounds");
		})
	});
});

//show login form
router.get("/login", (req, res) => {
	res.render("login", {message: req.flash("error"), page: "login"});
});

// handle login logic
router.post("/login", passport.authenticate("local", {
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}), (req, res) => {
});

// logout route
router.get("/logout", (req, res) => {
	req.logout();
	req.flash("success", "Logged you out!");
	res.redirect("/campgrounds");
});

module.exports = router;