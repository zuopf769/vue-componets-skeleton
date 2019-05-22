'use strict';

exports.__esModule = true;
exports.on = on;
exports.off = off;
var supportsPassive = exports.supportsPassive = false;

try {
    var opts = {};
    Object.defineProperty(opts, 'passive', {
        get: function get() {
            /* istanbul ignore next */
            exports.supportsPassive = supportsPassive = true;
        }
    });
    window.addEventListener('test-passive', null, opts);
} catch (e) {
    console.log(e);
}

function on(target, event, handler) {
    var passive = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    target.addEventListener(event, handler, supportsPassive ? { capture: false, passive: passive } : false);
}

function off(target, event, handler) {
    target.removeEventListener(event, handler);
}