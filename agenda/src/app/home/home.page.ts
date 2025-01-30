import { Component } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AccesoService } from '../servicio/acceso.service';
import { CuentaPage } from '../cuenta/cuenta.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})

export class HomePage {
  txt_usuario: string = "";
  txt_clave: string = "";
  intentosFallidos: number = 0;
  bloqueoActivo: boolean = false;

  constructor(
    private navCtrl: NavController,
    private servicio: AccesoService,
    private modalCtrl: ModalController
  ) {}

  login() {
    if (this.bloqueoActivo) {
      this.servicio.showToast("Has alcanzado el límite de intentos. Inténtalo más tarde.", 3000);
      return;
    }

    let datos = {
      accion: 'login',
      usuario: this.txt_usuario,
      clave: this.txt_clave
    };

    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado) {
        this.intentosFallidos = 0;

        // Guardar datos de usuario en sesión
        const { codigo, nombre, apellido, cedula, correo } = res.persona;
        this.servicio.createSesion('idpersona', codigo);
        this.servicio.createSesion('nombre', nombre);
        this.servicio.createSesion('apellido', apellido);
        this.servicio.createSesion('cedula', cedula);
        this.servicio.createSesion('correo', correo);

        // Redireccionar al menú
        this.navCtrl.navigateRoot(['/menu']);
      } else {
        this.manejarIntentosFallidos();
      }
    });
  }

  manejarIntentosFallidos() {
    this.intentosFallidos++;
    if (this.intentosFallidos >= 3) {
      this.bloqueoActivo = true;
      this.servicio.showToast("Has alcanzado el límite de intentos. Espera 10 minutos.", 3000);
      // Desbloqueo automático después de 10 minutos
      setTimeout(() => {
        this.bloqueoActivo = false;
        this.intentosFallidos = 0;
        this.servicio.showToast("Puedes intentar nuevamente.", 3000);
      }, 600000);
    } else {
      this.servicio.showToast("Credenciales incorrectas, intenta nuevamente.", 3000);
    }
  }

  async crearCuenta() {
    const modal = await this.modalCtrl.create({
      component: CuentaPage
    });
    return await modal.present();
  }

  restablecerClave() {
    this.navCtrl.navigateForward('/rclave');
  }

}
