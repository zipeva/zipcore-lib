const x7hash = require('@zipeva/x7-hash-js');
const crypto = require('crypto');

/**
 * @typedef {X7Hash} X7Hash
 * @property {Object} errors
 * @property {function((string|Array|buffer), number, number): (string|Array)} digest
 */

/**
 * @typedef {Crypto} Crypto
 * @property {function(string, HashOptions): Hash} createHash
 */

/**
 * @typedef {ZipCoreLibConfiguration} ZipCoreLibConfiguration
 * @property {X7Hash} [x7hash]
 * @property {Crypto} [crypto]
 */
const configuration = {
  x7hash,
  crypto
};

/**
 * Configures ZipCore library
 * @param {ZipCoreLibConfiguration} config
 */
const configure = (config) => {
  Object.assign(configuration, { ...config });
}

module.exports = {
  configuration,
  configure
}
