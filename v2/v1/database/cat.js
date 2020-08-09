var mongoose=require("mongoose");//import mongoose database from mongod to our JS file
mongoose.connect("mongodb://localhost/cat_app");//create new database named cat_app
//adding a new cat to the database
//retrieve all cats from db and console.log to DB

var catSchema= new mongoose.Schema({ //add schema or set of rules to thedatabse not necessarily compulsory but  can be added to add more functionality and made user to add thse three Details Compulsorily 
    name:String,
    age:Number,
    temperament:String
});

var Cat=mongoose.model("Cat",catSchema);//makes a new model from 

//var george=new Cat({
  //  name:"Mrs Norris",
    //age:9,
    //temperament:"Evil"
//});
//george is just a name returned by js
//cat is the whole db object which it is returning
//george.save(function(err,cat){
  //  if(err){
    //    console.log("SOMETHING WENT WRONG!!");
    //}else{
      //  console.log("WE HAD ADDED JUST ONE ENTRY TO THE DATABASE!!");
        //console.log(cat);
    //}
//})
//IT WILL CREATE AS WELL AS SAVE THE THE OBJECTS INTO THE DB
Cat.create({
    name:"Snow White",
    age:15,
    temperament:"Bland"
},function(err,cat){//callback function from database
    if(err){
        console.log(err);
    }else{
        console.log(cat);
    }
});

Cat.find({},function(err,cats){//callback function from database
        if(err){
            console.log("OH NO!! ERROR!!");
            console.log(err);
        }else{
            console.log("ALL THE CATS....");
            console.log(cats);
        }
});