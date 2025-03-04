import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  
  private secretKey: string = "EstaEsUnaClaveSecretaMuySegura"; // Clave de cifrado

  constructor() {}

  // Método para cifrar un texto con AES
  encrypt(text: string): string {
    return CryptoJS.AES.encrypt(text, this.secretKey).toString();
  }

  // Método para descifrar un texto cifrado con AES
  decrypt(encryptedText: string): string {
    const decrypted = CryptoJS.AES.decrypt(encryptedText, this.secretKey);
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
