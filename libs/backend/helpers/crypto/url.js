const crypto = require('crypto');

const SALT_KEY =  'AIOFOUNDATION';

const key = async (arg) => {
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey("raw", encoder.encode(arg), {name:"PBKDF2"}, false, ["deriveKey"]);

    return crypto.subtle.deriveKey({
        name:"PBKDF2",
        hash:"SHA-256",
        iterations:100000,
        salt:encoder.encode("tiny-url-salt"),  
    }, keyMaterial, {
        name: "AES-GCM",
        length: 256,
    }, false, ["encrypt", "decrypt"]);
}


const encrypt = async (path, key) => {
    const encoded = new TextEncoder().encode(path);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await crypto.subtle.encrypt({name: "AES-GCM", iv}, key, encoded);

    const full = new Uint8Array([...iv, ...new Uint8Array(encrypted)]);
  
    return Buffer.from(full).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); // URL-safe base64
}

const decryp = async (encryptedStr, key) => {
    const base64 = encryptedStr.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(encryptedStr.length / 4) * 4, "=");
    const buffer = Uint8Array.from(Buffer.from(base64, "base64"));
    const iv = buffer.slice(0, 12);
    const data = buffer.slice(12);
    const decrypted = await crypto.subtle.decrypt({name:"AES-GCM", iv}, key, data);
    return new TextDecoder().decode(decrypted);
}

exports.en = async (url) => {
    if(url){
        return await encrypt(url, await key(SALT_KEY))
    }else{
        return null;
    }
}

exports.de = async (url) => {
     if(url){
        return await decryp(url, await key(SALT_KEY))
    }else{
        return null;
    }
}