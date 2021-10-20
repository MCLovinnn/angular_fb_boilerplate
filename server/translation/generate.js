import { writeFile, readFile, mkdir, stat, readdir } from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import _ from "lodash";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function generateTxtFile(lang, data, res) {
  var entries = {};

  // console.log(data);
  var pages = data;
  for (const page in pages) {
    var forms = pages[page];
    for (const form in forms) {
      var items = forms[form];
      for (const item in items) {
        var obj = items[item];
        var keys = obj["name"];
        entries[keys + "#label"] = "";
        entries[keys + "#hintlabel"] = "";
        entries[keys + "#tooltip"] = "";
        if (obj["options"]) {
          for (const opt in obj["options"]) {
            var option = obj["options"][opt];
            entries[option["key"]] = entries[option["value"]]
              ? entries[option["value"]]
              : "";
            entries[option["key"] + "#desc"] = "";
          }
        }
      }
    }
  }
  var path = __dirname + "/../../src/assets/locale/";
  stat(path, (err, stat) => {
    if (err) {
      // console.log(err);
      mkdir(path, {}, function(error) {
        if (error) {
          // console.log(error);
        }
        writeTxtFile(path, entries, res, lang);
      });
    } else {
      writeTxtFile(path, entries, res, lang);
    }
  });
}

function writeTxtFile(path, entries, res, language) {
  var texts = {};
  readFile(path + language + ".json", "utf8", (err, data) => {
    if (err) {
      // console.log(err);
      writeFile(
        path + language + ".json",
        JSON.stringify(entries),
        {},
        function(error) {
          console.log(error);
          if (error) {
            res.send({ error: error });
          } else {
            res.send({ done: true });
          }
        }
      );
    } else {
      if (data) {
        texts = JSON.parse(data);
      }

      if (texts != {}) {
        Object.assign(entries, texts);
      }
      writeFile(
        path + language + ".json",
        JSON.stringify(entries),
        {},
        function(error) {
          if (error) {
            console.log(error);
            res.send({ error: error });
          } else {
            res.send({ done: true });
          }
        }
      );
    }
  });
}

function generateConfigFile(lang, config, res) {
  var path = __dirname + "/../../src/assets/config/";
  stat(path, (err, stat) => {
    if (err) {
      mkdir(path, function(err) {
        if (err) {
          // throw err;
        }
        writeConfigFile(path, lang, config, res);
      });
    } else {
      writeConfigFile(path, lang, config, res);
    }
  });
}

function writeConfigFile(path, lang, config, res) {
  var texts = {};
  readFile(path + "config.json", "utf8", (err, data) => {
    if (err) {
      writeFile(path + "config.json", JSON.stringify(config), {}, function(error) {
        if (error) {
          console.log(error);
          res.send({ error: error });
        }
        // res.send({ done: true });
        generateTxtFile(lang, config, res);
      });
    }

    if (data) {
      texts = JSON.parse(data);
    }

    if (texts != {}) {
      _.merge(config, texts);
    }

    writeFile(path + "config.json", JSON.stringify(config), {}, function(
      error
    ) {
      if (error) {
        console.log(error);
        res.send({ error: error });
      }
      // res.send({ done: true });
      generateTxtFile(lang, config, res);
    });
  });
}

function getConfigFile(res) {
  var path = __dirname + "/../../src/assets/config/config.json";
  readFile(path, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.send({ error: err });
    }
    if (data) {
      res.send(JSON.parse(data));
    }
  });
}

function updateTxtFile(lang, newData, res) {
  var path = __dirname + "/../../src/assets/locale/";
  var texts = {};
  readFile(path + lang + ".json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.send({ error: err });
    }

    if (data != undefined) {
      texts = JSON.parse(data);
    }

    if (texts != {}) {
      Object.assign(texts, newData);
    } else {
      texts = newData;
    }

    writeFile(path + lang + ".json", JSON.stringify(texts), {}, function(
      error
    ) {
      if (error) {
        console.log(error);
        res.send({ error: error });
      }
      res.send({ done: true });
    });
  });
}

function updateTxtKey(obj, res) {
  var path = __dirname + "/../../src/assets/locale/";

  readdir(path, (err, files) => {
    if (err) {
      console.log(err);
    }

    files.forEach(file => {
      readFile(path + file, "utf8", (err, data) => {
        if (err) {
          console.error(err);
        }
        data = JSON.parse(data);
        _.merge(data, obj);


        writeFile(path + file, JSON.stringify(data), {}, function(error) {
          if (error) {
            console.log(error);
          }
        });
      });
    });
    res.send({ done: true });
  });
}


function deleteTxtKey(obj, name, res) {
  console.log(obj);

  var path = __dirname + "/../../src/assets/locale/";
  const keys = name.split("_");
  const page = keys[0];
  const form = keys[1];
  const key = keys[2];

  readdir(path, (err, files) => {
    if (err) {
      console.log(err);
    }

    files.forEach(file => {
      readFile(path + file, "utf8", (err, data) => {
        if (err) {
          console.error(err);
        }
        data = JSON.parse(data);
        delete data[name + "#label"];
        delete data[name + "#hintlabel"];
        delete data[name + "#tooltip"];
        if (obj.options) {
          obj.options.forEach(opt => {
            delete data[opt.key];
            delete data[opt.key+'#desc'];
          });
        }

        writeFile(path + file, JSON.stringify(data), {}, function(error) {
          if (error) {
            console.log(error);
          }
        });
      });
    });
    res.send({ done: true });
  });
}

function deleteConfig(name, body, res) {
  var path = __dirname + "/../../src/assets/config/config.json";
  const keys = name.split("_");
  const page = keys[0];
  const form = keys[1];
  const key = keys[2];

  readFile(path, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.send({ error: err });
    }
    if (data) {
      data = JSON.parse(data);

      if (data[page] && data[page][form]) {
        deleteTxtKey(data[page][form][key], name, res);
        delete data[page][form][key];
        writeFile(path, JSON.stringify(data), {}, function(error) {
          if (error) {
            console.log(error);
          }
        });
      }
    }
  });
}

export {
  generateTxtFile,
  generateConfigFile,
  getConfigFile,
  updateTxtFile,
  deleteConfig,
  updateTxtKey
};
