import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  
  private secretKey: string = "EstaEsUnaClaveSecretaMuySegura"; // Debe ser privada y almacenada de forma segura

  constructor() {}

  // Método para cifrar un texto con AES
  encrypt(text: string): string {
    const encrypted = CryptoJS.AES.encrypt(text, this.secretKey).toString();
    return encrypted;
  }

  // Método para descifrar un texto cifrado con AES
  decrypt(encryptedText: string): string {
    const decrypted = CryptoJS.AES.decrypt(encryptedText, this.secretKey);
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
