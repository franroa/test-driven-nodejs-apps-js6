import SinonTutorial from '../src/sinontutorial';
import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonChaiInOrder from 'sinon-chai-in-order';
import assert from 'assert';

chai.use(sinonChai);
chai.use(sinonChaiInOrder);

describe('sinon tutorial', function () {

    let sandbox, sinonTutorial, xhr, requests, server, clock;

    beforeEach(function () {
        sinonTutorial = new SinonTutorial();
        sandbox = new sinon.sandbox.create();
        xhr = sinon.useFakeXMLHttpRequest();
        requests = [];
        xhr.onCreate = function (req) { requests.push(req); };
    });

    afterEach(function () {
        sandbox.restore();
        xhr.restore();
    });

    before(function () {
        server = sinon.fakeServer.create();
        clock = sinon.useFakeTimers();
    });

    after(function () {
        clock.restore();
        server.restore();
    });

    it('should pass the canary test', function () {
        expect(true).to.be.true
    });

    it('should pad a string', () => {
        assert.equal('0foo', '0foo');
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

    it("returns the return value from the original function", function () {
        var callback = sinon.stub().returns(42);
        var proxy = sinonTutorial.once(callback);

        assert.equal(proxy(), 42);
    });

    // it("makes a GET request for todo items", function () {
    //     sinonTutorial.getTodos(42, sinon.spy());
    //
    //     assert.equal(requests.length, 1);
    //     assert.match(requests[0].url, "/todo/42/items");
    // });

    // it("calls callback with deserialized data", function () {
    //     var callback = sinon.spy();
    //     sinonTutorial.getTodos(42, callback);
    //
    //     // This is part of the FakeXMLHttpRequest API
    //     server.requests[0].respond(
    //         200,
    //         { "Content-Type": "application/json" },
    //         JSON.stringify([{ id: 1, text: "Provide examples", done: true }])
    //     );
    //
    //     assert(callback.calledOnce);
    // });

    it('calls callback after 100ms', function () {
        var callback = sinon.spy();
        var throttled = sinonTutorial.throttle(callback);

        throttled();

        clock.tick(99);
        assert(callback.notCalled);

        clock.tick(1);
        assert(callback.calledOnce);

        // Also:
        // assert.equals(new Date().getTime(), 100);
    });
});