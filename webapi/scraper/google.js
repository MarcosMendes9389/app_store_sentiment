const mongo = require('./../src/mongo.js');
const gplay = require('google-play-scraper');


exports.getAppReview = function(app){

  console.log('Collecting Play Store reviews for : ' + app.name);

  gplay.reviews({appId: app.id, country: 'br', lang: 'pt-br', sort: gplay.sort.NEWEST, num: 1000})
  .then((reviews) => { 
    console.log('Saving reviews for : ' + app.name + ' - ' + app.store );
    reviews.forEach(review => {
      mongo.findReviewById(review.id).then(mongoReview => {
        if(!mongoReview){
          var doc = new Object();
          doc.id = review.id;
          doc.text = review.text;
          doc.score = review.score;
          doc.app = app.name;
          doc.store = 'google';
          mongo.insertReview(doc);
        }
      });
    });
  });

}


exports.getAppInfo = function(app){

  console.log('Collecting App Info for : ' + app.name + ' - ' + app.store );

  gplay.app({appId: app.id})
  .then((info) => { 
    console.log('Saving App Info for : ' + app.name + ' - ' +app.store );
      mongo.updateApp(app.id, info);
  });

}