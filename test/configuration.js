const chai = require('chai');
const X7 = require('wasm-x7-hash');
const Hash = require('../lib/crypto/hash');
const crypto = require('crypto');
const x7hash = require('@zipeva/x7-hash-js');

const { configure, BlockHeader } = require("../index");

const expect = chai.expect;

const headerBuffer = Buffer.from('01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff6004ffff001d01044c5761706e6577732e636f6d3a204e6f76616b20446a6f6b6f76696320616e64204361726c6f7320416c636172617a206d65657420696e20612057696d626c65646f6e206d656ee28099732066696e616c2072656d61746368ffffffff0100f2052a010000004341040184710fa689ad5023690c80f3a49c8f13f8d45b8c857fbcbc8bc4a8e4d3eb4b10f4d4604fa08dce601aaf0f470216fe1b51850b4acf21b179c45070ac7b03a9ac00000000','hex')
describe('configuration', function () {
  before(async () => {
    const x7 = await X7();
    configure({
      x7hash: {
        digest: (input) => x7.digest(input)
      },
      crypto: {
        createHash: () => ({
          update: () => ({
            digest: () => '00001111'
          })
        })
      }
    })
  });

  after(() => {
    configure({
      x7hash,
      crypto
    })
  })

  it('should use external x7 for block header hash', () => {
    const blockHeader = new BlockHeader(headerBuffer);
    expect(blockHeader.hash).to.equal('00000f2db18943ba05cc0d7c4ac5b6b462b40719f8e2c4fca9dfb494e3354a0f')
  })

  it('should use external crypto module', () => {
    const hash = Hash.sha512(Buffer.alloc(32));
    expect(hash).to.equal('00001111')
  })
});
