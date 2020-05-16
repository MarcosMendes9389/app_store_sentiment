const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const url = 'mongodb://localhost:27017';
const dataBase = 'app_sentiment';
const reviewsCollection = 'reviews';

exports.insertReview = function(doc){
    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {

        if (err) throw err;

        const db = client.db(dataBase);

        db.collection(reviewsCollection).insertOne(doc).then((doc) => {

        }).catch((err) => {

            console.log(err);
        }).finally(() => {

            client.close();
        });
    });

}

exports.insertReviewArray = function(reviewArray){
    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {

        if (err) throw err;

        const db = client.db(dataBase);

        db.collection(reviewsCollection).insertMany(reviewArray).then((doc) => {

        }).catch((err) => {

            console.log(err);
        }).finally(() => {

            client.close();
        });
    });
}

exports.findReviewById = function(id) {

    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {

        if (err) throw err;

        const db = client.db(dataBase);

        let query = { id: id }

        db.collection(reviewsCollection).findOne(query).then(doc => {
            doc;

        }).catch((err) => {

            console.log(err);
        }).finally(() => {

            client.close();
        });
    });

}