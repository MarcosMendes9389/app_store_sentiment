const mongo = require('./../src/mongo.js');
const store = require('app-store-scraper');
 

exports.getAppReview = function(app){

    console.log('Collecting Apple Store reviews for : ' + app.name);

    for (i = 0; i <= 10; i++) {
        store.reviews({id: app.id, country: 'br', sort: store.sort.RECENT, page: i})
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
                        doc.store = 'apple';
                        mongo.insertReview(doc);
                    }
                });
            });
        });
    }
}

exports.getAppInfo = function(app){

    console.log('Collecting App Info for : ' + app.name + ' - ' + app.store );

    store.app({id: app.id})
    .then((info) => { 
        console.log('Saving App Info for : ' + app.name + ' - ' + app.store );
        mongo.updateApp(app.id, info);
    });
}