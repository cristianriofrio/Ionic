import { Component, model } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { PaginadosPage } from '../paginados/paginados.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  public isModalOpen:boolean = false;
  public opciones:string = "";

  constructor( 
    private navCtrl: NavController,
    private router: Router,
    private modalCtrl: ModalController,
    private ToastCtrl: ToastController
  ) {}

  irp2n = () => {
    this.navCtrl.navigateForward('/paginados');
  }

  irp2r = () => {
    this.router.navigate(['/paginados'])
  }

  setOpen(isOpen: boolean){
    this.isModalOpen = isOpen;
  }

  llamarModal = async () => {
    const modal = await this.modalCtrl.create({
      component: PaginadosPage
    });
    return await modal.present();
  }

  mostrarToast = async(text:string, time:number = 2000) => {
    const toast = await this.ToastCtrl.create({
      message: text,
      duration: time,
      position: "top",
      color:"warning",
      header: "Mensajes App",
      icon: "checkmark-outline"
    });
    await toast.present()
  }

  verificarRadio(){
    this.mostrarToast(this.opciones,3000);
  }
}
