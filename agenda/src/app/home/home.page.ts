import { Component } from '@angular/core';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { AccesoService } from '../servicio/acceso.service';
import { CuentaPage } from '../cuenta/cuenta.page';
import { RclavePage } from '../rclave/rclave.page';
import { IngresoTokenPage } from '../ingreso-token/ingreso-token.page';

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

  login()
  {
    if (this.bloqueoActivo) {
      this.servicio.showToast("Has alcanzado el límite de intentos, por favor intenta más tarde.", 3000);
      return; // Si el usuario está bloqueado, no hacemos nada
    }

    let datos={
      accion:'login',
      usuario: this.txt_usuario,
      clave: this.txt_clave
    }
    this.servicio.postData(datos).subscribe((res:any)=>{
      if(res.estado){
        this.intentosFallidos =0;
        //Almacena localmente los datos del usuario
       this.servicio.createSesion('idpersona', res.persona.codigo)
       this.servicio.createSesion('nombre', res.persona.nombre)
       this.servicio.createSesion('apellido', res.persona.apellido)
       this.servicio.createSesion('cedula', res.persona.cedula)
       this.servicio.createSesion('correo', res.persona.correo)
       this.navCtrl.navigateRoot(['/menu'])
      }else{
        this.intentosFallidos++;
        if (this.intentosFallidos >= 3) {
          this.bloqueoActivo = true;
          setTimeout(() => {
            this.bloqueoActivo = false; // Reestablecer el bloqueo después de 10 minutos, por ejemplo
            this.intentosFallidos = 0; // Resetear los intentos fallidos
            this.servicio.showToast("Puedes intentar nuevamente.", 3000);
          }, 600000); // 10 minutos en milisegundos
          this.servicio.showToast("Has alcanzado el límite de intentos, por favor espera 10 minutos.", 3000);
        } else {
          this.servicio.showToast("Credenciales incorrectas, intenta nuevamente.", 3000);
        }
      }
    });
  }

  async ingresarToken(){
    const modal = await this.modalCtrl.create({
      component: IngresoTokenPage
    });
    return await modal.present();
    
  }

  async crearCuenta()
  {
    const modal = await this.modalCtrl.create({
      component: CuentaPage
    });
    return await modal.present();
  }

  async reestablecerClave()
  {
    const modal = await this.modalCtrl.create({
      component: RclavePage
    });
    return await modal.present();
  }

}