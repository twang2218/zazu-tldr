const expect = require('chai').expect;
const tldr = require('../src/index')();

tldr.console = console;

describe('tldr', () => {
  it('should find doc for "rm"', (done) => {
    tldr('rm').then((results) => {
      expect(results.length).to.be.above(0);
      expect(results[0].title).to.not.include('not find');
      expect(results.length).to.be.above(2);
      expect(results[1].title).to.include('another');
      done();
    }).catch(done);
  });
  it('should find doc "git rm"', (done) => {
    tldr('git rm').then((results) => {
      expect(results.length).to.be.above(0);
      expect(results[0].title).to.not.include('not find');
      expect(results.length).to.be.above(2);
      expect(results[1].title).to.include('git rm file');
      done();
    }).catch(done);
  });
  it('should say cannot find the page for non-exist-command', (done) => {
    tldr('non-exist-command').then((results) => {
      expect(results.length).to.be.at.least(0);
      expect(results[0].title).to.include('non-exist-command');
      done();
    }).catch(done);
  });
});
