var express         = require ("express"),
    app             = express(),
    bodyParser      = require("body-parser");
    mongoose        = require("mongoose"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    flash           = require("connect-flash"),
    methodOverride  = require("method-override"),
    seedDB          = require("./seeds"),
    mongoDB         = "mongodb://127.0.0.1/yelp_camp",
    db              = mongoose.connection;

var indexRoutes      = require("./routes/index"),
    commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds");

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);
db.on('error',console.error.bind(console,'MongoDB connection error:'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static(__dirname+"/public"));
app.set("view engine","ejs");
app.use(flash());

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "JThis is the my first full stack website.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
// seedDB(); //Seeding the database

app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

//DEFAULT ROUTE
app.get("*", function(req,res){
    res.send("PAGE NOT FOUND !!!");
});

//PORT LISTENER
app.listen(3000, function(){
    console.log("YelpCamp Server has started !!!");
});