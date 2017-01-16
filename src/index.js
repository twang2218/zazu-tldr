const cache = require('tldr/lib/cache');

function parseTitle(content) {
  const parser = /^> (.+)$/gm;
  const match = parser.exec(content);
  return {
    icon: 'fa-book',
    title: `${match[1]}`,
  };
}

function parserExamples(content) {
  const parser = /^- (.+)$\n\n^`([^`]+)`$/gm;
  const list = [];

  let match = parser.exec(content);

  while (match) {
    const title = match[2].replace(/{{/g, '').replace(/}}/g, '');
    list.push({
      icon: 'fa-book',
      title: `${title}`,
      subtitle: match[1],
    });
    match = parser.exec(content);
  }

  return list;
}

module.exports = () => command => new Promise((resolve, reject) => {
  try {
    const cmd = command.trim().replace(' ', '-');
    const content = cache.getPage(cmd);
    if (!content) {
      resolve([{
        icon: 'fa-book',
        title: `Cannot find document for '${command}'`,
      }]);
    } else {
      const list = [];
      //  Get Title
      list.push(parseTitle(content));
      //  Get example list
      list.push(...parserExamples(content).map(e => Object.assign({}, e, { value: cmd })));
      //  Return list
      resolve(list);
    }
  } catch (e) {
    reject(e);
  }
});
