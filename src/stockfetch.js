const fs = require('fs');
const http = require('http');


let Stockfetch = function() {
    this.readTickersFile = function(filename, onError) {
        let self = this;

        let processResponse = function(err, data) {
            if(err)
                onError('Error reading file: ' + filename);
            else {
                let tickers = self.parseTickers(data.toString());
                if(tickers.length === 0)
                    onError('File ' + filename + ' has invalid content');
                else
                    self.processTickers(tickers);
            }
        };

        fs.readFile(filename, processResponse);
    };

    this.parseTickers = function(content) {
        let isInRightFormat = function(str) {
            return str.trim().length !== 0 && str.indexOf(' ') < 0;
        };
        return content.split('\n').filter(isInRightFormat);
    };

    this.processTickers = function(tickers) {
        let self = this;
        self.tickersCount = tickers.length;
        tickers.forEach(function(ticker) { self.getPrice(ticker); });
    };

    this.tickersCount = 0;

    this.http = http;

    this.getPrice = function(symbol) {
        let url = 'http://ichart.finance.yahoo.com/table.csv?s=' + symbol;
        this.http.get(url, this.processResponse.bind(this, symbol))
            .on('error', this.processHttpError.bind(this, symbol));
    };

    this.processResponse = function(symbol, response) {
        let self = this;

        if(response.statusCode === 200) {
            let data = '';
            response.on('data', function(chunk) { data += chunk; });
            response.on('end', function() { self.parsePrice(symbol, data); });
        } else {
            self.processError(symbol, response.statusCode);
        }
    };

    this.processHttpError = function(ticker, error) {
        this.processError(ticker, error.code);
    };

    this.prices = {};

    this.parsePrice = function(ticker, data) {
        let price = data.split('\n')[1].split(',').pop();
        this.prices[ticker] = price;
        this.printReport();
    };

    this.errors = {};

    this.processError = function(ticker, error) {
        this.errors[ticker] = error;
        this.printReport();
    };

    this.printReport = function() {
        if(this.tickersCount ===
            Object.keys(this.prices).length + Object.keys(this.errors).length)
            this.reportCallback(this.sortData(this.prices), this.sortData(this.errors));
    };

    this.sortData = function(dataToSort) {
        let toArray = function(key) { return [key, dataToSort[key]]; };
        return Object.keys(dataToSort).sort().map(toArray);
    };

    this.reportCallback = function() {};

    this.getPriceForTickers = function(fileName, displayFn, errorFn) {
        this.reportCallback = displayFn;
        this.readTickersFile(fileName, errorFn);
    };
};

module.exports = Stockfetch;