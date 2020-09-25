const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

let data =  [
	{
		name: "Lake Watery-wet",
		image: "https://images.unsplash.com/photo-1519793945311-767397088877?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description: "Man braid you probably haven't heard of them pok pok, wayfarers vice hell of cornhole tumblr helvetica put a bird on it meh shoreditch taxidermy. Blue bottle microdosing wayfarers vaporware, man bun cronut hot chicken drinking vinegar edison bulb. Cloud bread umami coloring book pop-up man bun ramps small batch. Salvia 3 wolf moon copper mug, cold-pressed chicharrones kale chips health goth prism kombucha chambray raclette heirloom bespoke retro cardigan. Shoreditch franzen kombucha dreamcatcher locavore, banh mi tacos meggings plaid. Artisan before they sold out bicycle rights, vexillologist swag tofu aesthetic fam church-key. Trust fund iceland tattooed selfies, umami flexitarian chartreuse raw denim live-edge cornhole health goth letterpress."
	},
	{
		name: "Mountain Green Peak",
		image: "https://images.unsplash.com/photo-1532339142463-fd0a8979791a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description: "Man braid you probably haven't heard of them pok pok, wayfarers vice hell of cornhole tumblr helvetica put a bird on it meh shoreditch taxidermy. Blue bottle microdosing wayfarers vaporware, man bun cronut hot chicken drinking vinegar edison bulb. Cloud bread umami coloring book pop-up man bun ramps small batch. Salvia 3 wolf moon copper mug, cold-pressed chicharrones kale chips health goth prism kombucha chambray raclette heirloom bespoke retro cardigan. Shoreditch franzen kombucha dreamcatcher locavore, banh mi tacos meggings plaid. Artisan before they sold out bicycle rights, vexillologist swag tofu aesthetic fam church-key. Trust fund iceland tattooed selfies, umami flexitarian chartreuse raw denim live-edge cornhole health goth letterpress."
	},
	{
		name: "Forest of Lies",
		image: "https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description: "Man braid you probably haven't heard of them pok pok, wayfarers vice hell of cornhole tumblr helvetica put a bird on it meh shoreditch taxidermy. Blue bottle microdosing wayfarers vaporware, man bun cronut hot chicken drinking vinegar edison bulb. Cloud bread umami coloring book pop-up man bun ramps small batch. Salvia 3 wolf moon copper mug, cold-pressed chicharrones kale chips health goth prism kombucha chambray raclette heirloom bespoke retro cardigan. Shoreditch franzen kombucha dreamcatcher locavore, banh mi tacos meggings plaid. Artisan before they sold out bicycle rights, vexillologist swag tofu aesthetic fam church-key. Trust fund iceland tattooed selfies, umami flexitarian chartreuse raw denim live-edge cornhole health goth letterpress."
	},
];

// let seedDB = () => {
// 	// Remove all campgrounds
// 		Campground.deleteMany({}, (err) => {
// 			if(err){
// 				console.log(err);
// 			} else{
// 				console.log("Removed campgrounds");
// 			};
			
// 			// Add a few campgrounds
// 			data.forEach((seed) => {
// 				Campground.create(seed, (err, campground) => {
// 					if(err){
// 						console.log(err);
// 					} else{
// 						console.log("added new campground");
// 					}
// 					// Add comments
// 					Comment.create(
// 						{
// 							text: "This place is great, but I wish there was internet!",
// 							author: "Homer"
// 						}, (err, comment) => {
// 							if(err){
// 								console.log(err);
// 							} else {
// 								campground.comments.push(comment);
// 								campground.save();
// 								console.log("Created new comment");
// 							}
// 					});
// 				});
// 			});
// 		});
// 	};


// module.exports = seedDB;