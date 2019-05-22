"use strict";

exports.__esModule = true;
var context = {
    zIndex: 3000,
    modalStack: [],
    lockCount: 0,
    get topModal() {
        return this.modalStack[this.modalStack.length - 1];
    }
};

exports.default = context;