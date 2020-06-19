var mongoose=require("mongoose");

var CampGround=require("./models/campgrounds");
var Comment=require("./models/comments");

var campgroundarray=[
    {
        name : "KHEERGANGA",
        image : "https://i1.wp.com/www.devbhumitravels.com/wp-content/uploads/2017/08/Kheerganga-Camp-1.jpeg?fit=1280%2C720&ssl=1",
        description :"Khir Ganga is a small village set up through out the summers in Himachal Pradesh. It is open for 7 months in a year from March thru October. It is only accessible by foot. It is a beautiful day trek on a narrow cliff side path going by numerous waterfalls and few isolated villages. There is usually about 30-50 people at the village site during the high season."
    },

    {
        name : "RISHIKESH",
        image : "https://static2.tripoto.com/media/filter/tst/img/7372/TripDocument/1503751976_a_camp_site_by_the_ganga_rishikesh.jpg",
        description :"Whether it is just the need to relax and breathe in fresh, unpolluted air while sitting on the banks of the Ganges or the desire to get an adrenaline rush from river rafting, Rishikesh is the perfect destination, no matter what you are looking for. You can come here for rejuvenation or to get that kick of adventure or even to satisfy your spiritual side and you will not be disappointed."
    },

    {
        name : "LADAKH",
        image : "https://devilonwheels.com/wp-content/uploads/2018/05/26756446_1897054490324172_8200949010847709363_o.jpg",
        description :"a camping tour in Ladakh is what you should plan for. Ladakh has numerous trekking trails and camping sites, each more demanding than the next. If you’re an experienced explorer, a 9-day expedition to the Zanskar Gorge is perfect. You’ll be greeted by snow-clad mountains, frozen rivers and photo ops at every turn. If you’re one who can’t say ‘no’ to a motorbike tour, the Manali to Leh-Ladakh tour will be right up your street. "
    }
]

function seedDB(){

    //To remove all campgorunds present in DB initially
    CampGround.remove({},function(err){
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log("removed campgrounds!!");
        }

        //Add new campgrounds
        campgroundarray.forEach(function(seedarray){
          CampGround.create(seedarray , function(err,redata){
             if(err)
            {
                console.log(err);
            }
            else
            {
                console.log("added a campground");

                //Add a few comments also
                Comment.create({
                    text : "Beautiful place to visit",
                    author : "Homer"
                }, function(err,addedcomment){
                    if(err)
                    {
                        console.log(err);
                    }
                    else
                    {
                        redata.commentsarray.push(addedcomment);
                        redata.save();
                        console.log("comment added!!");
                    }
 
                })
            }
        });
    });
});

}

module.exports = seedDB;
