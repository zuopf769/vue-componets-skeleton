'use strict';

exports.__esModule = true;
exports.default = {
    // get nearest scroll element
    getScrollEventTarget: function getScrollEventTarget(element) {
        var rootParent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;

        var node = element;
        // bugfix, see http://w3help.org/zh-cn/causes/SD9013 and http://stackoverflow.com/questions/17016740/onscroll-function-is-not-working-for-chrome
        while (node && node.tagName !== 'HTML' && node.tagName !== 'BODY' && node.nodeType === 1 && node !== rootParent) {
            var _getComputedStyle = this.getComputedStyle(node),
                overflowY = _getComputedStyle.overflowY;

            if (overflowY === 'scroll' || overflowY === 'auto') {
                return node;
            }
            node = node.parentNode;
        }
        return rootParent;
    },
    getScrollTop: function getScrollTop(element) {
        return 'scrollTop' in element ? element.scrollTop : element.pageYOffset;
    },

    // get distance from element top to page top
    getElementTop: function getElementTop(element) {
        return (element === window ? 0 : element.getBoundingClientRect().top) + this.getScrollTop(window);
    },
    getVisibleHeight: function getVisibleHeight(element) {
        return element === window ? element.innerHeight : element.getBoundingClientRect().height;
    },


    getComputedStyle: document.defaultView.getComputedStyle.bind(document.defaultView)
};