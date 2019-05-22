'use strict';

exports.__esModule = true;
var _arguments = arguments;
var getDOM = exports.getDOM = function getDOM(dom) {
    if (dom.nodeType === 3) {
        dom = dom.nextElementSibling || dom.nextSibling;
        getDOM(dom);
    }
    return dom;
};

var merge = exports.merge = function merge(target) {
    for (var i = 1, j = _arguments.length; i < j; i++) {
        var source = _arguments[i] || {};
        for (var prop in source) {
            if (source.hasOwnProperty(prop)) {
                var value = source[prop];
                if (value !== undefined) {
                    target[prop] = value;
                }
            }
        }
    }
    return target;
};

/* istanbul ignore next */
var hasClass = exports.hasClass = function hasClass(el, cls) {
    if (!el || !cls) {
        return false;
    }
    if (cls.indexOf(' ') !== -1) {
        throw new Error('className should not contain space.');
    }
    if (el.classList) {
        return el.classList.contains(cls);
    }
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
};

/* istanbul ignore next */
var addClass = exports.addClass = function addClass(el, cls) {
    if (!el) return;
    var curClass = el.className;
    var classes = (cls || '').split(' ');

    for (var i = 0, j = classes.length; i < j; i++) {
        var clsName = classes[i];
        if (!clsName) {
            continue;
        }

        if (el.classList) {
            el.classList.add(clsName);
        } else {
            if (!hasClass(el, clsName)) {
                curClass += ' ' + clsName;
            }
        }
    }
    if (!el.classList) {
        el.className = curClass;
    }
};

/* istanbul ignore next */
var removeClass = exports.removeClass = function removeClass(el, cls) {
    if (!el || !cls) {
        return;
    }
    var classes = cls.split(' ');
    var curClass = ' ' + el.className + ' ';

    for (var i = 0, j = classes.length; i < j; i++) {
        var clsName = classes[i];
        if (!clsName) {
            continue;
        }

        if (el.classList) {
            el.classList.remove(clsName);
        } else {
            if (hasClass(el, clsName)) {
                curClass = curClass.replace(' ' + clsName + ' ', ' ');
            }
        }
    }
    if (!el.classList) {
        el.className = curClass.trim();
    }
};

var getScroll = exports.getScroll = function getScroll(w, top) {
    var ret = top ? w.pageYOffset : w.pageXOffset;
    var method = top ? 'scrollTop' : 'scrollLeft';
    if (typeof ret !== 'number') {
        var d = w.document;
        // ie6,7,8 standard mode
        ret = d.documentElement[method];
        if (typeof ret !== 'number') {
            // quirks mode
            ret = d.body[method];
        }
    }
    return ret;
};

var getClientPosition = exports.getClientPosition = function getClientPosition(elem) {
    var x = void 0;
    var y = void 0;
    var doc = elem.ownerDocument;
    var body = doc.body;
    var docElem = doc && doc.documentElement;
    var box = elem.getBoundingClientRect();
    x = box.left;
    y = box.top;
    x -= docElem.clientLeft || body.clientLeft || 0;
    y -= docElem.clientTop || body.clientTop || 0;
    return {
        left: x,
        top: y
    };
};

var getOffsetLeft = exports.getOffsetLeft = function getOffsetLeft(el) {
    var pos = getClientPosition(el);
    var doc = el.ownerDocument;
    var w = doc.defaultView || doc.parentWindow;
    pos.left += getScroll(w);
    return pos.left;
};