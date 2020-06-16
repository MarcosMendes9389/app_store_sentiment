const mongo = require('../mongo.js');
const gplay = require('google-play-scraper');

exports.getAppReview = async function(app){

  console.log('Collecting Play Store reviews for : ' + app.name);

  reviews = await gplay.reviews({appId: app.id, country: 'br', lang: 'pt-br', sort: gplay.sort.NEWEST, num: 1000});
  console.log('Saving reviews for : ' + app.name + ' - ' + app.store );
  for(review of reviews){
    mongoReview = await mongo.findReviewById(review.id);
    if(!mongoReview){
      var doc = new Object();
      doc.id = review.id;
      doc.text = review.text;
      doc.score = review.score;
      doc.date = new Date(review.date);
      doc.app = app.name;
      doc.appId = app.id;
      doc.store = 'google';
      mongo.insertReview(doc);
    }
  }
  console.log('Finished Save reviews for : ' + app.name + ' - ' + app.store );
}

exports.getAppInfo = function(app){
  console.log('Collecting App Info for : ' + app.name + ' - ' + app.store );
  gplay.app({appId: app.id})
  .then((info) => { 
    console.log('Saving App Info for : ' + app.name + ' - ' +app.store );
    mongo.updateApp(app.id, {histogram: info.histogram});
  }).catch(error => {
    console.log('Problem with get info Google Play')
  });

}