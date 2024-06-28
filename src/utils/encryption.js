import CryptoJS from 'crypto-js';

function base64UrlEncode(str) {
    return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(str) {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    while (str.length % 4) {
        str += '=';
    }
    return str;
}

export function encryptURI(id) {
    const encryptedId = CryptoJS.AES.encrypt(id, process.env.REACT_APP_PUBLIC_Secret_key).toString();
    return base64UrlEncode(encryptedId);
}

export function decryptId(encryptedId) {
    try {
        const encryptedBase64 = base64UrlDecode(encryptedId);
        const bytes = CryptoJS.AES.decrypt(encryptedBase64, process.env.REACT_APP_PUBLIC_Secret_key);
        const decryptedId = bytes.toString(CryptoJS.enc.Utf8);
        return decryptedId;
    } catch (error) {
        console.error('Decryption error:', error);
        return null; // Handle decryption failure gracefully
    }
}
