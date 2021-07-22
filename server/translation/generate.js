var fs = require("fs");
const mkdirp = require("mkdirp");

exports.generateTxtFile = function(data, res) {
  // console.log(data);
  var language;
  var entries = {};
  for (lang in data) {
    language = lang;
    var pages = data[lang];
    // console.log('page',lang);
    for (page in pages) {
      var forms = pages[page];
      // console.log('forms',forms);
      for (form in forms) {
        var items = forms[form];
        // console.log('items',items);
        for (item in items) {
          var obj = items[item];
          var keys = obj["name"];
          // console.log("item", keys);
          // var nameS = keys[2];
          // var form = keys[1];
          // var pageName = keys[0];

          // console.log(data[page][item]);
          entries[keys + "#label"] = "";
          // entries[keys + "#value"] = "";
          entries[keys + "#hintlabel"] = "";
          // entries[keys + "#placeholder"] = "";
          entries[keys + "#tooltip"] = "";

          if (obj["options"]) {
            for (opt in obj["options"]) {
              var option = obj["options"][opt];
              entries[option["key"]] = "";
              entries[option["key"] + "#desc"] = "";
            }
          }

          // entries[pageName][form][name] = {}
        }
      }
    }
  }

  // console.log(entries);

  var path = __dirname + "/../../src/assets/locale/";
  mkdirp(path, function(err) {
    if (err) {
      throw err;
    }
    var texts = {};
    fs.readFile(path + language + ".json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
        res.send({ error: err });
      }

      // console.log(data);
      if (data != "undefined") {
        texts = JSON.parse(data);
        // console.log(texts);
      }

      if (texts != {}) {
        Object.assign(entries, texts);
      }

      fs.writeFile(
        path + language + ".json",
        JSON.stringify(entries),
        {},
        function(error) {
          if (error) {
            console.log(error);
            res.send({ error: error });
          }
          res.send({ done: true });
        }
      );
    });
  });
};

exports.generateConfigFile = function(lang, config, res) {
  // console.log(config);
  var path = __dirname + "/../../src/app/config/";
  mkdirp(path, function(err) {
    if (err) {
      throw err;
    }
    var texts = {};
    fs.readFile(path + "config.json", "utf8", (err, data) => {
      if (err) {

        fs.writeFile(
          path + "config.json",
          JSON.stringify(config),
          {},
          function(error) {
            if (error) {
              // console.log(error);
              res.send({ error: error });
            }
            res.send({ done: true });
          }
        );

      }

      if (data) {
        texts = JSON.parse(data);
      }

      if (texts != {}) {
        Object.assign(config, texts);
      }

      fs.writeFile(
        path+ "config.json",
        JSON.stringify(config),
        {},
        function(error) {
          if (error) {
            console.log(error);
            res.send({ error: error });
          }
          res.send({ done: true });
        }
      );
    });
  });
};

exports.getConfigFile = function(res) {
  var path = __dirname + "/../../src/app/config/config.json";
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      // console.error(err);
      res.send({ error: err });
    }
    if(data) {
      res.send(JSON.parse(data));
    }
  });
}

exports.updateTxtFile = function(lang, newData, res) {
  var path = __dirname + "/../../src/assets/locale/";

  var texts = {};
  fs.readFile(path + lang + ".json", "utf8", (err, data) => {
    if (err) {
      // console.error(err);
      res.send({ error: err });
    }

    // console.log(data);
    if (data != "undefined") {
      texts = JSON.parse(data);
      // console.log(texts);
    }

    if (texts != {}) {
      Object.assign(texts, newData);
    } else {
      texts = newData;
    }

    fs.writeFile(path + lang + ".json", JSON.stringify(texts), {}, function(
      error
    ) {
      if (error) {
        console.log(error);
        res.send({ error: error });
      }
      res.send({ done: true });
    });
  });
};
