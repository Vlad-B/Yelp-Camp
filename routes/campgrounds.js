const express    = require("express");
const router     = express.Router();
const Campground = require("../models/campground");
const middleware = require("../middleware");
const NodeGeocoder = require('node-geocoder');
 
let options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};
 
let geocoder = NodeGeocoder(options);

// INDEX - display a list of all campgrounds
router.get("/", (req, res) =>{
	// Get all campgrounds from the DB
	Campground.find({}, (err, allCampgrounds) =>{
		if(err){
			console.log(err);
		} else{
			res.render("campgrounds/index", {campgrounds: allCampgrounds, page: "campgrounds"});
		}
	});
});

// CREATE - Add a new campground to the DB
router.post("/", middleware.isLoggedIn, (req, res) =>{
	// get data from form -> add to array
	let name = req.body.name;
	let image = req.body.image;
	let desc = req.body.description;
	let price = req.body.price;
	let author = 
		{
			id: req.user._id,
			username: req.user.username
		};
	geocoder.geocode(req.body.location, function (err, data) {
    if (err || !data.length) {
      req.flash('error', 'Invalid address');
      return res.redirect('back');
    }
    let lat = data[0].latitude;
    let lng = data[0].longitude;
    let location = data[0].formattedAddress;
	let newCampground = 
		{
			name: name, 
			image: image, 
			description: desc, 
			price: price,
			author: author,
			lat: lat,
			lng: lng,
			location: location
		};
		// Create a new campground and save it to the DB
		Campground.create(newCampground, (err, newlyCreatedCampground) => {
			if(err){
				req.flash("error", "Something went wrong!");
				console.log(err);
			} else{
				req.flash("success", "New campground created!");
				res.redirect("/campgrounds");
			}
		});
	});
});

// NEW - displays form to make a new campground
router.get("/new", middleware.isLoggedIn, (req, res) =>{
	res.render("campgrounds/new");
});

// SHOW - shows more info about the campground
router.get("/:id", (req, res) => {
	// find the campground with that provided ID
	Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
		if(err || !foundCampground){
			req.flash("error", "Campground not found");
			res.redirect("/campgrounds");
			console.log(err);
		} else{
			// render show template with that capground
			console.log(foundCampground);
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});

// EDIT route
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
	Campground.findById(req.params.id, (err, foundCampground) => {
		res.render("campgrounds/edit", {campground: foundCampground})
	})	
});

// DESTROY route
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
	Campground.findByIdAndRemove(req.params.id, (err, foundCampground) => {
		if(err){
			res.redirect("/campgrounds");
		} else{
			res.redirect("/campgrounds");
		}
	})
});


// UPDATE route
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
		if(err){
			res.redirect("/campgrounds");
		} else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	})
});

module.exports = router;