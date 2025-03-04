import { Component } from '@angular/core';
import { EncryptionService } from '../services/encryption.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  mensaje: string = "Mensaje de prueba";
  mensajeCifrado: string = "";
  mensajeDescifrado: string = "";

  constructor(private encryptionService: EncryptionService) {}

  // Cifrar el mensaje
  cifrarMensaje() {
    this.mensajeCifrado = this.encryptionService.encrypt(this.mensaje);
  }

  // Descifrar el mensaje
  descifrarMensaje() {
    this.mensajeDescifrado = this.encryptionService.decrypt(this.mensajeCifrado);
  }

}