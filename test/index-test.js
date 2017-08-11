import Stockfetch from '../src/stockfetch';
import fs from 'fs';
import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonChaiInOrder from 'sinon-chai-in-order';
import assert from 'assert';

chai.use(sinonChai);
chai.use(sinonChaiInOrder);

describe('index tests', function () {

    let stockfetch;
    let sandbox;

    beforeEach(function () {
        stockfetch = new Stockfetch();
        sandbox = new sinon.sandbox.create();
    });

    afterEach(function () {
        sandbox.restore();
    });

    it('should pass this canary test', function () {
        expect(true).to.be.true;
    });

    it('should throw an error if the file cannot be read', function (done) {
        let onError = function(err) {
            expect(err).to.be.eql('Error reading file: InvalidFile');
            done();
        };

        sandbox.stub(fs, 'readFile').callsFake(
            function(fileName, callback) {
                callback(new Error('failed'));
            }
        );

        stockfetch.readTickersFile('InvalidFile', onError);
    });
});