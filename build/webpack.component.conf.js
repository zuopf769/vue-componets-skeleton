const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const path = require('path');
const fs = require('fs');
const Components = require('../components.json');
const config = require('../config');

function resolve (dir) {
  return path.join(__dirname, '..', dir);
}

// 每个组件都设置成externals的，这样即使组件依赖也不会把几个组件打到一起
// components externals
const { pkgName } = config;
const externals = {};
Object.keys(Components).forEach((key) => {
  externals[`${pkgName}/packages/${key}`] = `${pkgName}/lib/${key}`;
});

// utils和mixins也需要单独打包，不要因为组件依赖了就要打包到一起了，这样会导致每个打出来的lib都包含utils
// src externals
// utils和mixins下不能有子目录
const utilsList = fs.readdirSync(resolve('src/utils'));
const mixinsList = fs.readdirSync(resolve('src/mixins'));

utilsList.forEach(function (file) {
  file = path.basename(file, '.js');
  externals[`${pkgName}/src/utils/${file}`] = `${pkgName}/lib/utils/${file}`;
});

mixinsList.forEach(function (file) {
  file = path.basename(file, '.js');
  externals[`${pkgName}/src/mixins/${file}`] = `${pkgName}/lib/mixins/${file}`;
});

// webpack config
module.exports = merge(baseWebpackConfig, {
  entry: Components,
  output: {
    libraryTarget: 'commonjs2'
  },
  externals: externals
});
