const mongo = require('../mongo.js');
const store = require('app-store-scraper');
 

exports.getAppReview = async function(app){

    console.log('Collecting Apple Store reviews for : ' + app.name);

    for (i = 1; i <= 10; i++) {
        reviews = await store.reviews({id: app.id, country: 'br', sort: store.sort.RECENT, page: i})
        console.log('Saving reviews for : ' + app.name + ' - ' + app.store +' - ' + 'Page ' + i);
        for(review of reviews){
            await mongo.findReviewById(review.id).then(mongoReview => {
              if(!mongoReview){
                var doc = new Object();
                doc.id = review.id;
                doc.text = review.text;
                doc.score = review.score;
                doc.app = app.name;
                doc.appId = app.id;
                doc.store = 'apple';
                mongo.insertReview(doc);
              }
            });
        }
    }
    console.log('Finished Save reviews for : ' + app.name + ' - ' + app.store );
}


exports.getAppInfo = function(app){
    console.log('Collecting App Info for : ' + app.name + ' - ' + app.store );
    store.app({id: app.id})
    .then((info) => { 
        console.log('Saving App Info for : ' + app.name + ' - ' + app.store );
        mongo.updateApp(app.id, info);
    });
}