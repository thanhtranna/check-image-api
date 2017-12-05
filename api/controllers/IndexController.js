"use strict";

module.exports = {

    index: async (req, res) => {
      console.log('This is a test content.');
        res.render('homepage',{
          title: 'Upload Image',
          uploadConfig: {
            maxSize: sails.config.upload.maxSize,
            allowExtensions: sails.config.upload.allowExtensions
          }
        });
    },

    postUpload: async (req, res) => {
      let result = await UploadService.uploadImage(req, res);
      console.log(result)
      console.log('Dang upload file');
      console.log(req.body);
    }
};
