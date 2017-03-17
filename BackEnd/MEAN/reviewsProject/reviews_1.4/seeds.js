let mongoose = require("mongoose");
let Campground = require("./models/campground");
let Comment = require("./models/comment");

// DATA
let data = [
  {
    name: "Yosemit",
    image: "http://www.yosemite.com/wp-content/uploads/2016/03/Yosemite-Falls-in-Spring-Mariposa-County.jpg",
    description: "Yosemite National Park is in California’s Sierra Nevada mountains. It’s famed for its giant, ancient sequoia trees, and for Tunnel View, the iconic vista of towering Bridalveil Fall and the granite cliffs of El Capitan and Half Dome.",
  },
  {
    name:"Yellowstone",
    image:"https://www.google.com/imgres?imgurl=http%3A%2F%2Fkids.nationalgeographic.com%2Fcontent%2Fdam%2Fkids%2Fphotos%2Farticles%2FHistory%2FM-Z%2FYELLOWSTONE%2520LAKE.jpg.adapt.945.1.jpg&imgrefurl=http%3A%2F%2Fkids.nationalgeographic.com%2Fexplore%2Fnature%2Fyellowstone%2F&docid=OfcywaA_LxGFGM&tbnid=Y8oHh0mLvn6SuM%3A&vet=1&w=945&h=531&bih=743&biw=1332&q=yellowstone&ved=0ahUKEwjY1_LHsNrSAhUB7WMKHbI7BLIQMwiEASgAMAA&iact=mrc&uact=8",
    description:"Yellowstone National Park is a nearly 3,500-sq.-mile wilderness recreation area atop a volcanic hot spot. Mostly in Wyoming, the park spreads into parts of Montana and Idaho too. Yellowstone features dramatic canyons,",
  },
  {
    name: "Grand Canyon",
    image: "https://www.google.com/imgres?imgurl=http%3A%2F%2Ftravel.usnews.com%2Fimages%2Fdestinations%2F16%2Fgrand_canyon_main_2014_-_shutterstock-kojihirano.jpg&imgrefurl=http%3A%2F%2Ftravel.usnews.com%2FGrand_Canyon_AZ%2F&docid=BvxoJYBapbtKOM&tbnid=bbtgthsPyFDfUM%3A&vet=1&w=445&h=280&bih=743&biw=1332&q=grand%20canyon&ved=0ahUKEwjT3pTxsNrSAhVD1mMKHSxGAhwQMwiIASgBMAE&iact=mrc&uact=8",
    description: "The Grand Canyon in Arizona is a natural formation distinguished by layered bands of red rock, revealing millions of years of geological history in cross-section.",
  }
]


function seedDB(){
  // REMOVE CAMPGROUNDS
  Campground.remove({}, function(err){
    if(err){
      console.log(err);
    }
    console.log("removed campgrounds");
    // ADD CAMPGROUNDS
    data.forEach(function(seed){
      Campground.create(seed, function(err, campground){
        if(err){
          console.log(err);
        } else {
          console.log("added a campground");
          // CREATE COMMENTS
          Comment.create(
            {
              text: "This is a comment",
              author: "Ulises",
            }, function(err, comment){
              if (err){
                console.log(err);
              } else {
                campground.comments.push(comment);
                camground.save();
                console.log("created new comment");
              }
            });
        }
      });
    });
  });
};

module.exports = seedDB;
