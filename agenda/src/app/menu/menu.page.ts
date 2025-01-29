import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { AccesoService } from '../servicio/acceso.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: false,
})
export class MenuPage implements OnInit {
nombre:string = "";
apellido:string = "";
  constructor(
    private navCtrl: NavController,
    private servicio: AccesoService,
    private router: Router,
    private menuCtrl: MenuController
  ) 
  {
    this.servicio.getSession("nombre").then((res:any)=>{
        this.nombre=res;
    });
    this.servicio.getSession("apellido").then((res:any)=>{
      this.apellido=res;
  });
  }

  ngOnInit() {
  }

 goToProfile(){
    this.navCtrl.navigateForward('/perfil');
  }
  

  logout(){
    this.router.navigate(['/home']);
    this.menuCtrl.close();
  }
}