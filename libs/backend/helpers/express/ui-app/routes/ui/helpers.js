const path = require('path');

const sendFile = async (url, req, res) => {
    const has = await req.helpers.file.reader.async.read(url);

    if(has){
        const wrt = ['s', 'e', 'n', 'd', 'F', 'i', 'l', 'e'];
        const mimeMap = {
            ".css": "text/css",
            ".png": "image/png",
            ".html": "text/html",
            ".jpg": "image/jpeg",
            ".svg": "image/svg+xml",
            ".json": "application/json",
            ".js": "application/javascript"
        };

        const ext = path.extname(url);
        const mimeType = mimeMap[ext] || "application/octet-stream";

        res.setHeader("Content-Type", mimeType);
        res[(wrt.join(''))](url);
    }else{
        res.writeHead(404);
        res.write('File not found');
        res.end();
    }
}

exports.sendFile = sendFile;