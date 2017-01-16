const expect = require('chai').expect;
const tldr = require('../src/index')();

tldr.console = console;

describe('tldr', () => {
  describe('.search', () => {
    it('does include a name', () => {
      tldr('spock').then((results) => {
        expect(results[0].title).to.include('spock');
      });
    });
    it('should find doc for "rm"', () => {
      tldr('rm').then((results) => {
        expect(results[0].title).to.include('another');
      });
    });
    it('should find doc "git rm"', () => {
      tldr('git rm').then((results) => {
        expect(results[0].title).to.include('git rm file');
      });
    });
  });
});
