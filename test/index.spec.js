const expect = require('chai').expect;
const tldr = require('../src/index')();

tldr.console = console;

describe('tldr', () => {
  describe('.search', () => {
    it('does include a name', (done) => {
      tldr('spock').then((results) => {
        expect(results[0].title).to.include('spock');
        done();
      }).catch(done);
    });
    it('should find doc for "rm"', (done) => {
      tldr('rm').then((results) => {
        expect(results[1].title).to.include('another');
        done();
      }).catch(done);
    });
    it('should find doc "git rm"', (done) => {
      tldr('git rm').then((results) => {
        expect(results[1].title).to.include('git rm file');
        done();
      }).catch(done);
    });
  });
});
