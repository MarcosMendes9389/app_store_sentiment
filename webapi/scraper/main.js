const mongo = require('./../src/mongo.js');
const google = require('./google.js');
const apple = require('./apple.js');

mongo.findAllApps().then(apps => {
    getAppsInfo(apps);
    getReviews(apps);
});

function getReviews(apps){
    apps.forEach(app => {
        if(app.store === 'google')
            google.getAppReview(app);
        if(app.store === 'apple')
            apple.getAppReview(app)
    });
}

function getAppsInfo(apps){
    apps.forEach(app => {
        if(app.store === 'google')
            google.getAppInfo(app);
        if(app.store === 'apple')
            apple.getAppInfo(app);
    });
}