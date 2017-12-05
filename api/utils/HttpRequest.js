
  const request = require('request');

module.exports = {

  check: function (data) {
    return new Promise((resolve, reject) => {
      let options = {
        method: 'POST',
        uri: sails.config.API_RESOURCE_SERVER,
        body: data,
        json: true
      };
      request(options, function (err, response, body) {
        if (err)
          return reject(err);
        return resolve(body);
      });
    });
  },


};
