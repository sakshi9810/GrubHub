//ALL MIDDLEWARE GOES HERE

var FoodFestival= require("../models/foodFestival");
var Comment = require("../models/comments");
var middlewareObj={};

//middleware for correct food festival user
middlewareObj.checkFoodFestivalOwnership = function(req , res , next){

        if(req.isAuthenticated())
        {
            //if loggedin then only show edit form
            FoodFestival.findById(req.params.id, function (err, foundFest) {
                if (err) 
                {
                    req.flash("error" , " FoodFestival not found!!");
                    res.redirect("back");
                }
                else 
                {
                    //does the user owns foodfestival added
                    if(foundFest.author.id.equals(req.user._id))
                    {
                        next();
                    }
                    else
                    {
                        req.flash("error", "you don't have permission to do that");
                        res.redirect("back");
                    }
                }
            });
        }
        else
        {
            req.flash("error" , "You need to be LoggedIn to do that");
            res.redirect("back"); 
        }
    }


//middleware for correct comment user
middlewareObj.checkCommentOwnership = function (req , res , next){

        if(req.isAuthenticated())
        {
            //if loggedin then only show edit comment form
            Comment.findById(req.params.comment_id, function (err, foundComment) {
                if (err) 
                {
                    res.redirect("back");
                }
                else 
                {
                    //does the user owns comment
                    if(foundComment.author.id.equals(req.user._id))
                    {
                        next();
                    }
                    else
                    {
                        req.flash("error", "you don't have permission to do that");
                        res.redirect("back");
                    }
                }
            });
        }
        else
        {
            req.flash("error" , "You need to be LoggedIn to do that");
            res.redirect("back");
        }
    }


//middleware to prevent user from adding comment is not signed in
middlewareObj.isLoggedIn = function(req , res, next) {
    if(req.isAuthenticated())
    {
        return next();
    }
    req.flash("error", "You need to be LoggedIn to do that!!");
    res.redirect("/login");
}   

module.exports = middlewareObj;