var fs = require('fs')


exports.getTxtFile = function (name, res) {

    var path = __dirname + '/../../src/assets/locale/';


    let rawdata = fs.readFileSync(path + name + '.json');
    let result = JSON.parse(rawdata);
    // console.log(result);
    res.send(result)
};
