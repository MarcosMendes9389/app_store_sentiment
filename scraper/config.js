var config = {
    development: {
        //mongodb connection settings
        database: {
            host:   'localhost',
            port:   '27017',
            db:     'app_sentiment'
        },
        //server details
        server: {
            host: '127.0.0.1',
            port: '4201'
        }
    },
    production: {
        //mongodb connection settings
        database: {
            host:   'localhost',
            port:   '27017',
            db:     'app_sentiment'
        },
        //server details
        server: {
            host:   '127.0.0.1',
            port:   '4201'
        }
    }
};

module.exports = config;