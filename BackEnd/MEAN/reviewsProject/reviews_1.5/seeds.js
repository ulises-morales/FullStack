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
    image:"http://kids.nationalgeographic.com/content/dam/kids/photos/articles/History/M-Z/YELLOWSTONE%20LAKE.jpg.adapt.945.1.jpg",
    description:"Yellowstone National Park is a nearly 3,500-sq.-mile wilderness recreation area atop a volcanic hot spot. Mostly in Wyoming, the park spreads into parts of Montana and Idaho too. Yellowstone features dramatic canyons,",
  },
  {
    name: "Grand Canyon",
    image: "http://travel.usnews.com/images/destinations/16/grand_canyon_main_2014_-_shutterstock-kojihirano.jpg",
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
                campground.save();
                console.log("created new comment");
              }
            });
        }
      });
    });
  });
};

module.exports = seedDB;
