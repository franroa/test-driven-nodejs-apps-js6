import SinonTutorial from '../src/sinontutorial';
import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonChaiInOrder from 'sinon-chai-in-order';
import assert from 'assert';

chai.use(sinonChai);
chai.use(sinonChaiInOrder);

describe('sinon tutorial', function () {

    let sandbox;
    let sinonTutorial;

    beforeEach(function () {
        sinonTutorial = new SinonTutorial();
        sandbox = new sinon.sandbox.create();
    });

    afterEach(function () {
        sandbox.restore();
    });

    it('should pass the canary test', function () {
        expect(true).to.be.true
    });

    it('calls the original function', function () {
        let callback = sinon.spy();
        let proxy = sinonTutorial.once(callback);

        proxy();

        expect(callback.called).to.be.true;
        assert(callback.called);
    });

    it('calls the original function only once', function () {
        let callback = sinon.spy();
        let proxy = sinonTutorial.once(callback);

        proxy();
        proxy();

        assert(callback.calledOnce);
        expect(callback).to.have.been.calledOnce;
    });

    it('calls original function with right this and args', function () {
        var spy = sinon.spy();
        [1, 2, 3].forEach(spy);
        expect(spy.getCall(0).args[0]).to.equal(1);
        expect(spy.getCall(1).args[0]).to.equal(2);
        expect(spy.getCall(2).args[0]).to.equal(3);


        expect(spy).inOrder.to.have.been.calledWith(1)
            .subsequently.calledWith(2)
            .subsequently.calledWith(3);
    });
});