"use strict";

var formidable = require('formidable');
var fs = require('fs');
// var upload = multer({ dest: sails.config.API_RESOURCE_SERVER });

const path = require("path");

const UploadService = {
  uploadImage: asyncWrap(async (req, res) => {
    return  new Promise((resolve, reject) => {
      var form = new formidable.IncomingForm();
      form.parse(req, function (err, fields, files) {
        console.log('files: ',files);
        var oldpath = files.image_id.path;
        var newpath = sails.config.API_RESOURCE_SERVER + files.image_id.name;
        fs.rename(oldpath, newpath, function (err) {
          if (err) throw reject(err);
          resolve(true);
        });
      });
    });
  }),
}

module.exports = UploadService;
