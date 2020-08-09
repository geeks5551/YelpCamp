var express       = require('express'),
      app              = express(),
      bodyParser  = require("body-parser"),
      mongoose     =require('mongoose')

  mongoose.connect("mongodb://localhost/yelp_camp");
  app.use(bodyParser.urlencoded({ extended: true }));
  app.set("view engine", "ejs");


  //SCHEMA SETUP
  var campgroundSchema=new mongoose.Schema({
      name:String,
      image:String,
      description:String
  });

  var Campground=mongoose.model("Campground",campgroundSchema);

  Campground.create({ 
      name: "Nature2",
       image: "https://cdn.pixabay.com/photo/2019/10/08/14/38/landscape-4535199_1280.jpg",
       description:"very beutiful nature's image!!"
     },function(err,campground){
         if(err){
             console.log(err);
         }
         else{
             console.log("OUR NEWLY CREATED CAMPGROUND!!!");
             console.log(campground);
         }
     });

   //var campgrounds = [
     //     { name: "Nature1", image: "https://cdn.pixabay.com/photo/2015/06/19/21/24/the-road-815297_1280.jpg" },            
       //  { name: "Nature2", image: "https://cdn.pixabay.com/photo/2019/10/08/14/38/landscape-4535199_1280.jpg" },
      //   { name: "Nature3", image: " https://cdn.pixabay.com/photo/2017/03/27/15/14/forest-2179318_1280.jpg " }
     //  ]
app.get("/", function (req, res) {
    res.render("landing");
});
//INDEX- route show all campgrounds
app.get("/campgrounds", function (req, res) {
    //GET ALL CAMPGROUNDS FROM DB
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("index", { campgrounds: allCampgrounds});      
        }
    });
});

//CREATE NEW ROUTE-Add new campground to the DB
app.post("/campgrounds", function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var desc=req.body.description;
    var newCampground = {name:name, image:image , description:desc};
    //CREATE A NEW CAMPGROUND AND SAVE IT TO THE DATABASE
    Campground.create(newCampground,function(err,newlyCreated){
        if(err){
            console.log(err);
        }else{      
            res.redirect("/campgrounds");//defaultly it will redirect as get request and not post request although it is inside the post request
        }
    });
     // campgrounds.push(newCampground);
    //res.send("You Hit The Post Route");
    //Get Data from the form and add it to campgrounds array
    //redirect back to campgrounds page
});
//NEW-show form to create new campground 
app.get("/campgrounds/new", function (req, res) {
    res.render("new.ejs");
});

//SHOW ROUTE-show more info about campground!!
app.get("/campgrounds/:id",function(req,res){
    //find the campground with required id
    //render show template with that campgrounds
   // console.log("THIS WILL BE SHOW PAGE ONE DAY!!!")
   Campground.findById(req.params.id, function(err, foundCampground){
       if(err){
           console.log(err);
       }else{
           //render show template wih that campground
           res.render("show",  {campground: foundCampground});
       }
   });
  // res.render("show")
});




app.listen(3000, function () {
    console.log("My Server Has Started!!!");
});
