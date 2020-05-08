'use strict'
const config = require('../../config')
const logger = require('../../logger')

const PicGo = require('picgo')

exports.uploadImage = function(imagePath, callback) {
  if (!callback || typeof callback !== 'function') {
    logger.error('Callback has to be a function')
    return
  }

  if (!imagePath || typeof imagePath !== 'string') {
    callback(new Error('Image path is missing or wrong'), null)
    return
  }

  let picgo = new PicGo()

  picgo.setConfig({
    "picBed": {
      "uploader": "github",
      "github": {
        "repo": config.picgogh.repo,
        "token": config.picgogh.token,
        "path": config.picgogh.path,
        "customUrl": config.picgogh.customUrl,
        "branch": config.picgogh.branch
      }
    }
  })

  picgo.upload([imagePath])
    .then(function() {
      callback(null, picgo.output[0].imgUrl)
    }).catch(function(err) {
      callback(new Error(err), null)
    })
}
