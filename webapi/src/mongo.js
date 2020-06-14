const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];
const mongo = require('mongodb');
const Mongoose = require('mongoose')
const ObjectId = Mongoose.Types.ObjectId;
mongodbOptions = { useNewUrlParser: true, useUnifiedTopology: true }


const MongoClient = mongo.MongoClient;
const url = 'mongodb://'+ config.database.host +':'+ config.database.port;
const dataBase = config.database.db;
const reviewsCollection = 'reviews';
const appsCollection = 'apps';

exports.insertReview = async function(review){    
    const db = await MongoClient.connect(url, mongodbOptions);
    const dbo = db.db(dataBase);
    dbo.collection(reviewsCollection).insertOne(review);
}

exports.insertReviewArray = async function(reviewArray){
    const db = await MongoClient.connect(url, mongodbOptions);
    const dbo = db.db(dataBase);
    dbo.collection(reviewsCollection).insertMany(reviewArray);
}

exports.findReviewById = async function(id) {
    const db = await MongoClient.connect(url, mongodbOptions);
    const dbo = db.db(dataBase);
    const query = { id: id }
    const result = await dbo.collection(reviewsCollection).findOne(query);
    return result;
}

exports.findAllReviews = async function () {
    const db = await MongoClient.connect(url, mongodbOptions);
    const dbo = db.db(dataBase);
    const result = await dbo.collection(reviewsCollection).find({}).toArray()
    return result;
}

exports.updateApp = async function(id, app){
    const db = await MongoClient.connect(url, mongodbOptions);
    const dbo = db.db(dataBase);
    const query = { id: id }
    const updateQuery = { $set: app };
    const result = await dbo.collection(appsCollection).updateOne(query, updateQuery);
    return result;
}

exports.findAppById = async function(id) {
    const db = await MongoClient.connect(url, mongodbOptions);
    const dbo = db.db(dataBase);
    const query = { id: id }
    const result = await dbo.collection(appsCollection).findOne(query);
    return result;
}

exports.findAllApps = async function () {
    const db = await MongoClient.connect(url, mongodbOptions);
    const dbo = db.db(dataBase);
    const result = await dbo.collection(appsCollection).find({}).toArray()
    return result;
}

exports.insertApp = async function(app){    
    const db = await MongoClient.connect(url, mongodbOptions);
    const dbo = db.db(dataBase);
    const result = await dbo.collection(appsCollection).insertOne(app);
    return result;
}

exports.deleteApp = async function(_id){
    const db = await MongoClient.connect(url, mongodbOptions);
    const dbo = db.db(dataBase);
    const query = { _id : ObjectId(_id) }
    const result = await dbo.collection(appsCollection).deleteOne(query);
    return result;
}

exports.updateAppById = async function(_id, app){
    const db = await MongoClient.connect(url, mongodbOptions);
    const dbo = db.db(dataBase);
    const query = { _id : ObjectId(_id) }
    const updateQuery = { $set: {id: app.id, name: app.name, store: app.store }};
    const result = await dbo.collection(appsCollection).updateOne(query, updateQuery);
    return result;
}
