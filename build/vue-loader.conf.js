'use strict'
const utils = require('./utils');
const sourceMapEnabled = true;

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: true,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
