/**
 * 读取packages目录生成组件列表
 */
const fs = require('fs');
const path = require('path');

const excludes = [
  'style',
  'mixins',
  'utils'
];

module.exports = function () {
  const dirs = fs.readdirSync(path.resolve(__dirname, '../../packages'));
  return dirs.filter(dirName => excludes.indexOf(dirName) === -1);
};