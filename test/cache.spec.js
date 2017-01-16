const expect = require('chai').expect;
const cache = require('../src/cache')();

cache.console = console;

describe('cache', () => {
  /* eslint-disable func-names */
  it('can update', function (done) {
    this.timeout(5000);
    cache().then((results) => {
      expect(results).to.be.equal('done');
      done();
    }).catch(done);
  });
});
