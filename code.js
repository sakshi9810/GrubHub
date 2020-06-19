
var express         =require("express"),
    bodyparser      =require("body-parser"),
    mongoose        =require("mongoose"),
    methodOverride  =require("method-override"),
    flash           =require("connect-flash"),
    moment          =require("moment"),
    passport        =require("passport"),
    localStrategy   =require("passport-local"),
    expressSession  =require("express-session");


//Data Association
var FoodFestival=require("./models/foodFestival.js"); 
var Comment=require("./models/comments.js");
var User=require("./models/user.js");


//requiring routes
var foodFestivalRoutes     = require("./routes/foodFestival.js"),
    commentRoutes        = require("./routes/comments.js"),
    authenticationRoutes = require("./routes/auth.js");

// var seedDB= require("./seeds");
// seedDB();

//app configuration
mongoose.connect("mongodb://localhost/grub_hub");
var app=express();
app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(flash());
app.use(express.static(__dirname + "/public"));  //dirmane shows the whole path of directory
app.locals.moment=require("moment");


//passport configuration
app.use(require("express-session")({
    secret : "Food is Love",
    resave : false,
    saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//middleware created for currentUser
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error=req.flash("error");    //for flash messages in template
    res.locals.success=req.flash("success");
    next();
});


//routes configuration
app.use("/foodFestival",foodFestivalRoutes); 
app.use("/foodFestival/:id/comment",commentRoutes);
app.use(authenticationRoutes);


app.listen(3000,function(req,res){
    console.log("GrubHub Server has started!!");
});