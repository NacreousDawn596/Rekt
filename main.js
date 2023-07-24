import BrowserDetector from 'https://cdn.jsdelivr.net/npm/browser-dtector/browser-dtector.esm.js';

document.getElementById("myVideo").play()

const detector = new BrowserDetector(window.navigator.userAgent);

const sleep = (milliseconds) => { return new Promise(resolve => setTimeout(resolve, milliseconds)) };

const sumDicts = (dictionaries) => {
    const result = {};
    dictionaries.forEach(dictionary => {
        for (const key in dictionary) {
            if (dictionary.hasOwnProperty(key)) {
                if (result.hasOwnProperty(key)) {
                    if (typeof dictionary[key] === 'number' && typeof result[key] === 'number') {
                        result[key] += dictionary[key];
                    } else {
                        console.error('Unsupported data type for key:', key);
                    }
                } else {
                    result[key] = dictionary[key];
                }
            }
        }
    });
    return result;
}

const filterTruthyValues = (obj) => {
    const filteredDict = {};
    Object.keys(obj).forEach(key => { if (obj[key] !== false) { filteredDict[key] = obj[key]; } });
    return filteredDict;
}

const represent = async (data, repl = { '': '' }) => {
    Object.keys(data).forEach(async element => {
        var p = element
        Object.keys(repl).forEach(e => {
            p = p.replace(e, repl[e])
        })
        console.log(`${p}: ${data[element]}`);
        await sleep(2500);
        document.getElementById("rekt").innerHTML += `${p}: ${data[element]} <br/>`
    });
}

const data = filterTruthyValues(detector.parseUserAgent())

const basic = await (await fetch('https://wtfismyip.com/json')).json();

const systemInfo = {
    'System Languages': navigator.languages.join(', '),
    'Screen Width': `${screen.width}px`,
    'Screen Height': `${screen.height}px`,
};

if (screen.width !== window.width || screen.height !== window.height) {
    systemInfo['Window Width'] = `${window.outerWidth}px`;
    systemInfo['Window Height'] = `${window.outerHeight}px`;
}

systemInfo['Display Pixel Depth'] = screen.pixelDepth;

if (typeof screen.orientation !== 'undefined') {
    systemInfo['Screen Orientation'] = screen.orientation.type.split('-')[0];
    systemInfo['Screen Rotation'] = `${screen.orientation.angle} degrees`;
}

systemInfo['CPU Threads'] = navigator.hardwareConcurrency;

systemInfo['Available Browser Memory'] = typeof window.performance.memory !== 'undefined' ?
    `${Math.round(window.performance.memory.jsHeapSizeLimit / 1024 / 1024)} MB` : null;

systemInfo['Total RAM'] = navigator.deviceMemory * 1024 + "Mb";

const canvas = document.createElement('canvas');
systemInfo['Gpu Vendor'] = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')).getParameter((canvas.getContext('webgl') || canvas.getContext('experimental-webgl')).getExtension('WEBGL_debug_renderer_info').UNMASKED_VENDOR_WEBGL);
systemInfo['Gpu Info'] = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')).getParameter((canvas.getContext('webgl') || canvas.getContext('experimental-webgl')).getExtension('WEBGL_debug_renderer_info').UNMASKED_RENDERER_WEBGL);

const load = async () => {
    await sleep(13000)
    const represent = async (data, repl = { '': '' }) => {
        for (const element of Object.keys(data)) {
            let p = element;
            Object.keys(repl).forEach(e => {
                p = p.replace(e, repl[e]);
            });
            console.log(`${p}: ${data[element]}`);
            await sleep(300);
            document.getElementById("rekt").innerHTML += `${p}: ${data[element]} <br/>`;
        }
    };

    await represent(sumDicts([basic, data, systemInfo]), { "YourFucking": "", "is": "Using ", "name": "Browser", "version": "Browser Version", "shortVersion": "Short Browser Version" })
}

await load()