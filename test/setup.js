/**
 * setup
 *
 * @author luoage@msn.cn
 */

const path = require('path');
const dotenv = require('dotenv').config({path: path.resolve(process.cwd(), '.env.testing')});

if (dotenv.error) {
  throw dotenv.error;
}

global.assert = require('assert');

global.include = function(file) {
  return require(path.resolve(process.cwd(), file));
};
