const google = require('./google.js');
const apple = require('./apple.js');

const googleApps = ['com.whatsapp'];
const appleApps = [310633997];

googleApps.forEach(app => {
    console.log('Collecting Play Store reviews for : ' + app);
    google.getAppReview(app);
});

appleApps.forEach( app => {
    console.log('Collecting Apple Store reviews for : ' + app);
    apple.getAppReview(app)
});