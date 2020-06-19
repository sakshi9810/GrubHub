var express=require("express");
var router=express.Router();
var passport=require("passport");
var User=require("../models/user.js");


router.get("/",function(req,res){
    res.render("LandingPage");
});

//============================================
//AUTHENTICATION ROUTES
//=============================================

//show register form
router.get("/register" , function(req,res){
    res.render("register");
});

//submit the form
router.post("/register", function(req,res){

    var newUser= new User({username : req.body.username});
    User.register(newUser , req.body.password , function(err,name){
        if(err)
        {
            req.flash("error" , err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function() {
            req.flash("success", "Welcome to GrubHub " + name.username);
            res.redirect("/foodFestival");
        });
    });
});

//show LOGIN Form
router.get("/login" , function(req,res){
    res.render("login");
});

//submit form
//app.post("/login , middleware , callback")
router.post("/login" ,passport.authenticate("local",
{
    successRedirect : "/foodFestival",
    failureRedirect : "/login"
}), function(req,res){
});

//LOGOUT route
router.get("/logout" , function(req,res) {
    req.logout();
    req.flash("success" , "Logged you Out!!");
    res.redirect("/foodFestival");
});


module.exports = router;