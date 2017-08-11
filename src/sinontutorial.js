import jQuery from 'jquery';

let SinonTutorial = function () {

     this.once = function(fn) {
        var returnValue, called = false;
        return function () {
            if (!called) {
                called = true;
                returnValue = fn.apply(this, arguments);
            }
            return returnValue;
        };
    };

    this.getTodos = function (listId, callback) {
        new jQuery().ajax(
            '/todo/' + listId + '/items',
            {
                success: function (data) {
                    callback(null, data);
                }
            }
        );
    };

    this.throttle = function (callback) {
        var timer;
        return function () {
            clearTimeout(timer);
            var args = [].slice.call(arguments);
            timer = setTimeout(function () {
                callback.apply(this, args);
            }, 100);
        };
    }
};

module.exports = SinonTutorial;