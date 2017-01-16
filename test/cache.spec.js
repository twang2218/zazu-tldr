const expect = require('chai').expect;
const cache = require('../src/cache')();

cache.console = console;

describe('cache', () => {
  describe('.update', () => {
    it('can update', () => {
      cache().then((results) => {
        expect(results).to.be('done');
      });
    });
  });
});
