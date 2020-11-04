var fs = require('fs')
const mkdirp = require('mkdirp');


exports.generateTxtFile = function (lang, data, res) {
  // console.log(data);
  var entries = {};
  for (page in data) {
    // console.log(page);
    for (item in data[page]) {
      var keys = String(data[page][item]['name']).split('_');
      var nameS = keys[2];
      var form = keys[1];
      var pageName = keys[0];

      // console.log(data[page][item]);
      entries[data[page][item]['name'] + '#label'] = "";
      entries[data[page][item]['name'] + '#value'] = "";
      entries[data[page][item]['name'] + '#hintlabel'] = "";
      entries[data[page][item]['name'] + '#placeholder'] = "";
      entries[data[page][item]['name'] + '#tooltip'] = "";

      // entries[pageName][form][name] = {}
    };
  };

  // console.log(entries);

  var path = __dirname + '/../../src/assets/locale/';
  mkdirp(path, function (err) {
    if (err) {
      throw err;
    }
    fs.writeFile(path + pageName + '_' + form + '.' + lang + '.json', JSON.stringify(entries), {}, function (err) {
      if (err) {
        console.log(err)
      }
      res.send('done');
    });
  });
}
