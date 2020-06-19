var express = require("express");
var router = express.Router();
var FoodFestival = require("../models/foodFestival.js");
var middleware = require("../middleware/index.js");  


//INDEX ROUTE:-To show all the main page
router.get("/", function (req, res) {

    FoodFestival.find({}, function (err, gotfest) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("foodFestivals/foodFestivalPage.ejs", { varFood: gotfest });
        }
    });
});


//CREATE ROUTE:-To add new foodfest to the DB
router.post("/", middleware.isLoggedIn, function (req, res) {

    //get data from the form
    var newfest = req.body.FestName;
    var newlocation = req.body.FestLocation;
    var newprice = req.body.FestPrice;
    var newimage = req.body.FestImage;
    var newdesc = req.body.FestDescription;
    var addAuthor = {
        id: req.user._id,
        username: req.user.username
    }
    var newFoodFest = { name: newfest, location:newlocation, price:newprice, image: newimage, description: newdesc, author: addAuthor };

    //Create a new foodfestival and save to DB
    FoodFestival.create(newFoodFest, function (err, newfest) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(newfest);
            res.redirect("/foodFestival");
        }
    });
});


//NEW ROUTE:-To show form to create new foodfestival
router.get("/new", middleware.isLoggedIn, function (req, res) {
    res.render("foodFestivals/FormPage.ejs");
});


//SHOW ROUTE:-To show the information about individual foodfestival
router.get("/:id", function (req, res) {
    
    FoodFestival.findById(req.params.id).populate("commentsarray").exec(function (err, foundfest) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(foundfest);
            //render show template with that foodfestival
            res.render("foodFestivals/InfoPage.ejs", { varFoodFest: foundfest });
        }
    });
});


//EDIT ROUTE
router.get("/:id/edit", middleware.checkFoodFestivalOwnership, function (req, res) {

        //if middleware works(i.e correct user is loggedIn) then this part (next();)
        FoodFestival.findById(req.params.id, function (err, foundfest) 
        {
            res.render("foodFestivals/edit", { varedit: foundfest });
        });
    });


//UPDATE ROUTE
router.put("/:id", middleware.checkFoodFestivalOwnership, function (req, res) {
    //find and update correct foodfestival
    FoodFestival.findByIdAndUpdate(req.params.id, req.body.fest, function (err, updatedfest) {
        if (err) {
            res.redirect("/foodFestival");
        }
        else {
            //redirect to show page
            res.redirect("/foodFestival/" + req.params.id);
        }
    });
});


//DESTROY ROUTE
router.delete("/:id", middleware.checkFoodFestivalOwnership, function(req,res){
    FoodFestival.findByIdAndDelete(req.params.id , function(err,deletedfest){
        if(err)
        {
            res.redirect("/foodFestival");
        }
        else
        {
            res.redirect("/foodFestival");
        }
    });
});

module.exports = router;