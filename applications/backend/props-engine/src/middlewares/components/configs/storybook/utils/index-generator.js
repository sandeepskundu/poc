const fs = require('fs');
const path = require('path');
const helpers = require('./helpers');

const hasExport = (txt, name) => {
    const esc = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const reg = new RegExp(`exports(?:\\.${esc}|\\[['"]${esc}['"]\\])\\s*=\\s*require\\(\\s*['"]\\.\\/${esc}(?:\\/index)?(?:\\.js)?['"]\\s*\\)`, 'm');
    return reg.test(txt);
};

const toExportLine = (name) => {
    const isId = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(name);
    const key = isId ? `.${name}` : `['${name}']`;
    return `exports${key} = require('./${name}');`;
};

const syncIndex = (dir, next = null, fallback = '') => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    const file = path.join(dir, 'index.js');
    const exists = fs.existsSync(file);

    if (!next) {
        if (!exists) fs.writeFileSync(file, fallback, 'utf8');
        return file;
    }

    const line = toExportLine(next);

    if (!exists) {
        fs.writeFileSync(file, `${line}\n`, 'utf8');
        return file;
    }

    const txt = fs.readFileSync(file, 'utf8');

    if (!hasExport(txt, next)) {
        const pre = txt.length > 0 && !txt.endsWith('\n') ? '\n' : '';
        fs.appendFileSync(file, `${pre}${line}\n`, 'utf8');
    }

    return file;
};

const init = async (req, res, next) => {
    const compPath = req.helpers.json.get(req, 'body.data.component.path', '');
    const base = await helpers.storybookPath(req, res, next);
    const segs = `${compPath || ''}`.trim().split(/[./\\]+/).filter(Boolean);

    if (!segs.length) return;

    const files = [syncIndex(base, segs[0])];
    let cur = base;

    for (let i = 0; i < segs.length; i++) {
        cur = path.join(cur, segs[i]);
        files.push(syncIndex(cur, segs[i + 1] || null));
    }

    return {
        leafDir: cur,
        touchedFiles: files,
    };
};

exports.init = init;