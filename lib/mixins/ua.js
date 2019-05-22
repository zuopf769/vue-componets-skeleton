"use strict";

exports.__esModule = true;
exports.default = {
    data: function data() {
        return {
            isMobile: /(iPhone|iPad|iPod|iOS|Android|SymbianOS|Windows Phone|Mobile)/i.test(navigator.userAgent)
        };
    }
};