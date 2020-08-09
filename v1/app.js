var express = require('express');
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

var campgrounds = [
    { name: "Nature1", image: "https://cdn.pixabay.com/photo/2015/06/19/21/24/the-road-815297_1280.jpg" },            
    { name: "Nature2", image: "https://cdn.pixabay.com/photo/2019/10/08/14/38/landscape-4535199_1280.jpg" },
    { name: "Nature3", image: " https://cdn.pixabay.com/photo/2017/03/27/15/14/forest-2179318_1280.jpg " }
]
app.get("/", function (req, res) {
    res.render("landing");
});

app.get("/campgrounds", function (req, res) {

    res.render("campgrounds", { campgrounds: campgrounds });
});

app.post("/campgrounds", function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name:name,image:image};
      campgrounds.push(newCampground);
    //res.send("You Hit The Post Route");
    //Get Data from the form and add it to campgrounds array
    //redirect back to campgrounds page
    res.redirect("/campgrounds");//defaultly it will redirect as get request and not post request although it is inside the post request
});

app.get("/campgrounds/new", function (req, res) {
    res.render("new.ejs");
});



app.listen(3000, function () {
    console.log("My Server Has Started!!!");
});
