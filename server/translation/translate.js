var fs = require('fs')
const mkdirp = require('mkdirp');


exports.getTxtFile = function (name, res) {

    var path = __dirname + '/../../src/assets/locale/';


    let rawdata = fs.readFileSync(path + name + '.json');
    let result = JSON.parse(rawdata);
    // console.log(result);
    res.send(result)
}

exports.saveTxtFile = function (name, data, res) {

    var path = __dirname + '/../../src/assets/locale/';


    fs.writeFile(path + name + '.json', JSON.stringify(data), {}, function (err) {
        if (err) {
            console.log(err)
        }
        res.send('done');
    });
}