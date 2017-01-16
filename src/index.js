const cache = require('tldr/lib/cache');

const parser = /^- (.+)$\n\n^`([^`]+)`$/gm;

module.exports = () => command => new Promise((resolve, reject) => {
  try {
    const cmd = command.replace(' ', '-');
    const content = cache.getPage(cmd);
    if (!content) {
      resolve([{
        icon: 'fa-book',
        title: `Cannot find document for '${command}'`,
      }]);
    } else {
      const list = [];
      let match = parser.exec(content);

      while (match) {
        const title = match[2].replace(/{{/g, '').replace(/}}/g, '');
        list.push({
          icon: 'fa-book',
          title: `${title}`,
          subtitle: match[1],
          value: `${cmd}`,
        });
        match = parser.exec(content);
      }

      resolve(list);
    }
  } catch (e) {
    reject(e);
  }
});
