import { Injectable } from '@angular/core';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { Preferences} from '@capacitor/preferences';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccesoService {
  server: string="http://localhost/Wagenda25/agenda.php";//API

  constructor(
    public ToastCtrl: ToastController,
    public http: HttpClient,
    private modalCtrl: ModalController
  ) 
    { }

    postData(body: any)
    {
      let head = new HttpHeaders({'Content-Type': 'application/json, charset:utf8'});
      let options={
        headers: head
      }
      return this.http.post(this.server, JSON.stringify(body), options)
    }

    // Obtener datos del perfil
  getPerfil(codigo: string): Observable<any> {
    const data = { accion: 'getProfile', codigo };
    return this.http.post(this.server, data);
  }

  // Actualizar datos del perfil
  actualizarPerfil(datos: any): Observable<any> {
    const data = { ...datos, accion: 'updateProfile' };
    return this.http.post(this.server, data);
  }

    async showToast(mensaje: string, tiempo:number)
    {
      const toast= await this.ToastCtrl.create({
        message: mensaje,
        duration: tiempo,
        position: 'top'
      });
      toast.present();
    }

    async createSesion(id: string, valor: string)
    {
      await Preferences.set({
        key: id,
        value: valor
      });
    }

    async getSession(id: string)
    {
      const item = await Preferences.get({
        key: id
      });
      console.log(item.value)
      return item.value
    }

    async closeSession()
    {
      await Preferences.clear();
    }

    async recoverPassword(email: string)
    {
      let body = {
        'accion': 'recoverPassword', 
        'email': email
      };

      try{
        const response: any = await this.postData(body).toPromise();

        if(response.estado){
          await this.showToast(response.mensaje, 3000);
          await this.modalCtrl.dismiss();
        }else{
          await this.showToast(response.mensaje, 3000);
        }
      }catch(error)
      {
        console.log(error);
        await this.showToast("Error al conectar con el servidor", 3000);
      }
      
    }
}