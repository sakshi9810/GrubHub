var mongoose=require("mongoose");

//SCHEMA 
var foodFestivalSchema= new mongoose.Schema({
    name: String,
    location :String,
    price : String,
    image: String,
    description: String,
    createdAt: { type: Date, default: Date.now },   //it is for moment.js
    author: {
        id:
        {
           type : mongoose.Schema.Types.ObjectId,
           ref : "User"
        },
        username :String
    },

    commentsarray: [
        {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Comment"
        }
    ]
});


module.exports = mongoose.model("FoodFestival",foodFestivalSchema);

