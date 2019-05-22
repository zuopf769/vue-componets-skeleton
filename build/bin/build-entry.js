const path = require('path');
const fs = require('fs');
const uppercamelcase = require('uppercamelcase');
const Components = require('../../components.json');

const packageJson = require('../../package.json');
// 版本号
const version = process.env.VERSION || packageJson.version;

function buildEntry() {
    const importComponentTemplate = [];
    const installTemplate = [];
    const listTemplate = [];
    // 排除不需要install的package
    const uninstallComponents = [
        'Locale',
        'style'
    ];
    Object.keys(Components).forEach(name => {
        const componentName = uppercamelcase(name);
        const path = Components[name];
        // 头部import
        importComponentTemplate.push(
            `import ${componentName} from '${path}';`
        );
        
        // 需要export的package
        listTemplate.push(componentName);

        // 需要install的package
        if (uninstallComponents.includes(name)) {
            return;
        }
        installTemplate.push(componentName);
    });

    const importStr = importComponentTemplate.join('\n');
    const installStr = installTemplate.join(',\n    ');
    const listStr = listTemplate.join(',\n    ') + ',';

    const template = `/* Automatically generated by './webpack/bin/build-entry.js' */
${importStr}

const version = '${version}';
const components = [
    ${installStr}
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
    ${listStr}
};

export default {
    version,
    install,
    ...components
};
`;

    fs.writeFileSync(path.join(__dirname, '../../src/index.js'), template);
    console.log('build entry success');
}


buildEntry();