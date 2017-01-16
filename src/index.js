const cache = require('tldr/lib/cache');

function parseTitle(content) {
  const parser = /^> (.+)$/gm;
  const match = parser.exec(content);
  if (match) {
    return {
      icon: 'fa-book',
      title: `${match[1]}`,
    };
  }
  return null;
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

function parse(cmd, content) {
  const list = [];
  //  Get Title
  const title = parseTitle(content);
  if (title) {
    list.push(title);
  }
  //  Get example list
  list.push(...parserExamples(content).map(e => Object.assign({}, e, { value: cmd })));
  //  Return list
  return list;
}

module.exports = () => command => new Promise((resolve, reject) => {
  try {
    const cmd = command.trim().replace(' ', '-');
    const content = cache.getPage(cmd);
    if (!content) {
      cache.update(() => {
        const c = cache.getPage(cmd);
        if (!c) {
          resolve([{
            icon: 'fa-book',
            title: `Cannot find document for '${command.trim()}'`,
          }]);
        } else {
          resolve(parse(cmd, c));
        }
      });
    } else {
      resolve(parse(cmd, content));
    }
  } catch (e) {
    reject(e);
  }
});
