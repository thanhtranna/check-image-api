'use strict';

module.exports = function(req, res, next) {

  console.log(req.file);

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  return res.forbidden('You are not permitted to perform this action.');
};
