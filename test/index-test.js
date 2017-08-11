// const expect = require('chai').expect;
// const sinon = require('sinon');
// const fs = require('fs');
// const Stockfetch = require('../src/stockfetch');
//
// describe('index tests', function () {
//
//     let stockfetch;
//     let sandbox;
//
//     beforeEach(function () {
//         stockfetch = new Stockfetch();
//         sandbox = new sinon.sandbox.create();
//     });
//
//     afterEach(function () {
//         sandbox.restore();
//     });
//
//     it('should pass this canary test', function () {
//         expect(true).to.be.true;
//     });
//
//     it('should throw an error if the file cannot be read', function (done) {
//         let onError = function(err) {
//             expect(err).to.be.eql('Error reading file: InvalidFile');
//             done();
//         };
//
//         sandbox.stub(fs, 'readFile').callsFake(
//             function(fileName, callback) {
//                 callback(new Error('failed'));
//             }
//         );
//
//         stockfetch.readTickersFile('InvalidFile', onError);
//     });
// });