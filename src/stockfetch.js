const fs = require('fs');

let Stockfetch = function () {


    this.readTickersFile = function (fileName, onError) {
        var proccesResponse = function (err, data) {
            if (err) {
                onError('Error reading file: ' + fileName);
            }
        }

        fs.readFile(fileName, proccesResponse);
    }
}

module.exports = Stockfetch;