export const getDOM = (dom) => {
    if (dom.nodeType === 3) {
        dom = dom.nextElementSibling || dom.nextSibling;
        getDOM(dom);
    }
    return dom;
};

export const merge = (target) => {
    for (let i = 1, j = arguments.length; i < j; i++) {
        let source = arguments[i] || {};
        for (let prop in source) {
            if (source.hasOwnProperty(prop)) {
                let value = source[prop];
                if (value !== undefined) {
                    target[prop] = value;
                }
            }
        }
    }
    return target;
};

/* istanbul ignore next */
export const hasClass = (el, cls) => {
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
export const addClass = (el, cls) => {
    if (!el) return;
    let curClass = el.className;
    let classes = (cls || '').split(' ');

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
export const removeClass = (el, cls) => {
    if (!el || !cls) {
        return;
    }
    let classes = cls.split(' ');
    let curClass = ' ' + el.className + ' ';

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

export const getScroll = (w, top) => {
    let ret = top ? w.pageYOffset : w.pageXOffset;
    const method = top ? 'scrollTop' : 'scrollLeft';
    if (typeof ret !== 'number') {
        const d = w.document;
        // ie6,7,8 standard mode
        ret = d.documentElement[method];
        if (typeof ret !== 'number') {
            // quirks mode
            ret = d.body[method];
        }
    }
    return ret;
};

export const getClientPosition = (elem) => {
    let x;
    let y;
    const doc = elem.ownerDocument;
    const body = doc.body;
    const docElem = doc && doc.documentElement;
    const box = elem.getBoundingClientRect();
    x = box.left;
    y = box.top;
    x -= docElem.clientLeft || body.clientLeft || 0;
    y -= docElem.clientTop || body.clientTop || 0;
    return {
        left: x,
        top: y,
    };
};

export const getOffsetLeft = (el) => {
    const pos = getClientPosition(el);
    const doc = el.ownerDocument;
    const w = doc.defaultView || doc.parentWindow;
    pos.left += getScroll(w);
    return pos.left;
};
