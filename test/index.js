/* eslint-disable */
// TODO: Remove previous line and work through linting issues at next edit

'use strict';

var should = require('chai').should();
var sinon = require('sinon');
var bitcore = require('../index.js');

describe('#versionGuard', function () {
  it('global._zipcore should be defined', function () {
    should.equal(global._zipcore, bitcore.version);
  });

  it('throw a warning if version is already defined', function () {
    sinon.stub(console, 'warn');
    bitcore.versionGuard('version');
    should.equal(console.warn.calledOnce, true);
    should.equal(
      console.warn.calledWith(
        'More than one instance of zipcore-lib found. Please make sure that you are not mixing instances of classes of the different versions of zipcore.'
      ),
      true
    );
  });
});
