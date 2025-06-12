import { salt, secretKey } from '@constants/Contants';
import CryptoJS from 'crypto-js';

export const encryptAES = (plainText: string): string => {
    // Parse the secret key as UTF-8 (32-byte key for AES-256)
    const key = CryptoJS.enc.Utf8.parse(secretKey); // Changed from Base64 to Utf8
    const iv = CryptoJS.lib.WordArray.create(new Uint8Array(16));
    const encrypted = CryptoJS.AES.encrypt(plainText, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });

    return encrypted.toString();
};

// SHA-256 Hashing with Salt
export const hashSHA256WithSalt = (input: string): string => {
    const hash = CryptoJS.SHA256(input + salt);
    return CryptoJS.enc.Base64.stringify(hash);
};
