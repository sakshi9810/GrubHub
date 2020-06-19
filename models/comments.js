var mongoose=require("mongoose");


var commentSchema = mongoose.Schema({
    text : String,
    createdAt: { type: Date, default: Date.now },
    author : {
        id : 
        {
           type : mongoose.Schema.Types.ObjectId,
           ref : "User"                                  //USER ASSOCIATION OF COMMENT WITH USER
        },
        username : String
    }
});

module.exports =  mongoose.model("Comment" , commentSchema);