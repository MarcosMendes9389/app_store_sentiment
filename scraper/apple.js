const mongo = require('./mongo.js');
const store = require('app-store-scraper');
 

exports.getAppReview = function(appID){

    for (i = 0; i <= 10; i++) {

        store.reviews({id: appID, country: 'br', sort: store.sort.RECENT})
        .then((reviews) => {
            console.log('Saving reviews for : ' + appID);
            reviews.forEach(review => {
                if(!mongo.findReviewById(review.id))
                    mongo.insertReview(review);
            });
        });

    }
}