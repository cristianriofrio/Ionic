import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AccesoService } from '../servicio/acceso.service';

@Component({
  selector: 'app-rclave',
  templateUrl: './rclave.page.html',
  styleUrls: ['./rclave.page.scss'],
  standalone: false,
})
export class RclavePage {
  cedula: string = "";
  palabraClave: string = ""; // Ahora es token_recuperacion en la BD
  nuevaClave: string = "";
  credencialesVerificadas: boolean = false;

  constructor(
    private navCtrl: NavController,
    private servicio: AccesoService
  ) {}

  // Verifica la cédula y la palabra clave antes de permitir cambiar la contraseña
  verificarCredenciales() {
    let datos = {
      accion: 'verificarCredenciales',
      cedula: this.cedula,
      palabraClave: this.palabraClave
    };

    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado) {
        this.credencialesVerificadas = true;
      } else {
        this.servicio.showToast("Cédula o palabra clave incorrecta.", 3000);
      }
    });
  }

  // Cambia la contraseña en la base de datos
  actualizarClave() {
    if (this.nuevaClave.length < 4) {
      this.servicio.showToast("La nueva clave debe tener al menos 4 caracteres.", 3000);
      return;
    }

    let datos = {
      accion: 'actualizarClave',
      cedula: this.cedula,
      nuevaClave: this.nuevaClave
    };

    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado) {
        this.servicio.showToast("Actualizada con éxito.", 3000);
        this.navCtrl.navigateRoot('/home');
      } else {
        this.servicio.showToast("Error al actualizar", 3000);
      }
    });
  }
}
