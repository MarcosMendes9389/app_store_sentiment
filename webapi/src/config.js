const oncatch = res => err => {
  res.status(500).send(err)
  console.log(err)
}

exports.oncatch = oncatch 

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
          port: '3000'
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
          port:   '3000'
      }
  }
};

module.exports = config;