/* Automatically generated by './webpack/bin/build-entry.js' */
import Button from 'packages/button';
import Input from 'packages/input';

const version = '1.0.0';
const components = [
    Button,
    Input
];

const install = function (Vue, opts = {}) {
    components.forEach(component => {
        Vue.use(component);
    });
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export {
    Button,
    Input,
};

export default {
    version,
    install,
    ...components
};
