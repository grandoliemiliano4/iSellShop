import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.COOKIE_SECRET_KEY || "mi-secreto-super-seguro-siat-2026";

class EncryptedService {
  encrypt(data: unknown): string {
    const jsonString = JSON.stringify(data);
    const encrypted = CryptoJS.AES.encrypt(jsonString, SECRET_KEY).toString();
    return encodeURIComponent(encrypted);
  }

  decrypt<T>(encryptedText: string): T | null {
    try {
      const decoded = decodeURIComponent(encryptedText);
      const bytes = CryptoJS.AES.decrypt(decoded, SECRET_KEY);
      const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
      
      if (!decryptedString) return null;
      
      return JSON.parse(decryptedString) as T;
    } catch (error) {
      console.error("Error al desencriptar la cookie", error);
      return null;
    }
  }
}

const encryptedService = new EncryptedService();
export default encryptedService;
