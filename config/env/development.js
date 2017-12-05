/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  port: process.env.PORT || 1337,
  environment: process.env.NODE_ENV || 'development',
  API_RESOURCE_SERVER: 'http://192.168.0.71:5000/api/v1.0/image/check',

  upload: {
    maxSize: 10 * 1024 * 1024, // 10 megabyte
    allowExtensions: ['png', 'jpg', 'jpeg'],
    fileTypeErrorCode: 'FILE_TYPE_NOT_ALLOW',
    fileLimitErrorCode: 'E_EXCEEDS_UPLOAD_LIMIT'
  },
  siteUrl: 'http://localhost:1337',
  mongodbUri: 'mongodb://localhost:27017/ico-user',
  timeZone: 'Asia/Tokyo',
  s3: {
    key: 'AKIAJ34WFWFE24TUHE7Q',
    secret: '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',
    bucket: 'casinoadmin',
    region: 'ap-northeast-1'
  }

  // models: {
  //   connection: 'someMongodbServer'
  // }

};
