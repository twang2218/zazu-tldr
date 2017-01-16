const cache = require('tldr/lib/cache');

module.exports = () => () => new Promise((resolve, reject) => {
  try {
    cache.update(() => { resolve('done'); });
  } catch (e) {
    reject(e);
  }
});
