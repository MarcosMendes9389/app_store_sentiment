const mongo = require('./mongo.js');
const gplay = require("google-play-scraper");


exports.getAppReview = function(appID){

  gplay.reviews({appId: appID, country: 'br', lang: 'pt-br', sort: gplay.sort.NEWEST, num: 1000})
  .then((reviews) => { 
    console.log('Saving reviews for : ' + appID);
    reviews.forEach(review => {
      if(!mongo.findReviewById(review.id))
        mongo.insertReview(review);
    });
  });

}