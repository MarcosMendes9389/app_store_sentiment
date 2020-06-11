const mongo = require('../mongo.js');
const google = require('./google.js');
const apple = require('./apple.js');

mongo.findAllApps().then(apps => {
    getAppsInfo(apps);
    getReviews(apps).then(() => {
        console.log('Finished all');
        process.exit(1);
    }
    );
});

async function getReviews(apps){
    for (app of apps) {
        if(app.store === 'google')
            await google.getAppReview(app);
        if(app.store === 'apple')
            await apple.getAppReview(app)
    }
}

function getAppsInfo(apps){
    apps.forEach(app => {
        if(app.store === 'google')
            google.getAppInfo(app);
        if(app.store === 'apple')
            apple.getAppInfo(app);
    });
}