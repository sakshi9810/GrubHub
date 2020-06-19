var express=require("express");
var router = express.Router({mergeParams:true});

var FoodFestival=require("../models/foodFestival.js");
var Comment=require("../models/comments.js");

var middleware = require("../middleware/index.js");


//comments create
router.get("/new", middleware.isLoggedIn, function(req,res){

    FoodFestival.findById(req.params.id, function(err,create){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("comments/Form.ejs" , {varcg:create});
        }
    });
});


//comments new
router.post("/", middleware.isLoggedIn, function(req,res){
    //lookup campground by ID
    FoodFestival.findById(req.params.id, function(err,found){
        if(err)
        {
            console.log(err);
            res.redirect("/foodFestival");
        }
        else
        {
            //Create a new comment
            Comment.create(req.body.commentdata, function(err,newcomment){
                if(err)
                {
                    req.flash("error", "something went wrong");
                    console.log(err);
                }
                else
                { 
                    //add username and id to comment
                    newcomment.author.id = req.user._id;
                    newcomment.author.username = req.user.username;
                    //save comment
                    newcomment.save();
                    //add it to db
                    found.commentsarray.push(newcomment);
                    found.save();
                    console.log(newcomment);
                    //redirect to campground show page
                    req.flash("success", "successfully added comment");
                    res.redirect('/foodFestival/' + req.params.id);
                }
            });
        }
    });
});


//comment edit route
router.get("/:comment_id/edit" , middleware.checkCommentOwnership, function(req , res){
    Comment.findById(req.params.comment_id , function(err,foundComment){
        if(err)
        {
            res.redirect("back");
        }
        else
        {
            res.render("comments/edit" , {campground_id :req.params.id, varcomment: foundComment}); 
        }
    });
});


//comment update route
router.put("/:comment_id" , middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id , req.body.commentdata ,function(err,updatedComment){
        if(err)
        {
            res.redirect("back");
        }
        else
        {
            res.redirect("/foodFestival/" + req.params.id);
        }
    });
});


//comment destroy route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id , function(err){
        if(err)
        {
            res.redirect("back");
        }
        else
        {
            req.flash("success" , "comment deleted!!");
            res.redirect("/foodFestival/" + req.params.id);
        }
    });
});

module.exports = router;