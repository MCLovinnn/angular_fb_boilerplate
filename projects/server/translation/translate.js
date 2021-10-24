import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function getTxtFile(name, res) {
    var path = __dirname + "/../../../src/assets/locale/";

    let rawdata = fs.readFileSync(path + name + '.json');
    let result = JSON.parse(rawdata);
    res.send(result)
};
export { getTxtFile };
