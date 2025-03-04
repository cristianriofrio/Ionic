import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true, // ✅ Indica que es un componente independiente (sin módulos)
  imports: [IonicModule, CommonModule, FormsModule], // ✅ Importar IonicModule aquí
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  mensaje: string = "Mensaje de prueba";
  mensajeCifrado: string = "";
  mensajeDescifrado: string = "";

  constructor() {}

  cifrarMensaje() {
    this.mensajeCifrado = btoa(this.mensaje); // Ejemplo básico de cifrado (Base64)
  }

  descifrarMensaje() {
    this.mensajeDescifrado = atob(this.mensajeCifrado);
  }
}
