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
  codigo: number = 0
  nombres: string = '';
  nombre: string = '';
  apellido: string = '';
  contactos: any = [];
  cod_persona:string="";

  constructor(
    private navCtrl: NavController,
    private servicio: AccesoService,
    private router: Router,
    private menuCtrl: MenuController,
    private perfilService: AccesoService) 
    {
      this.cargarDatosSesion();
      
      this.servicio.getSession('persona').then((res:any)=>{
        this.nombre=res;
      });

      this.servicio.getSession('idpersona').then((res:any)=>{
        this.cod_persona=res;
        this.lcontactos(); 
      });
     
    }
    

  async cargarDatosSesion() {
    try {
      // Esperar a que se obtengan los valores de la sesión
      this.nombres = (await this.perfilService.getSession('nombre')) || ''; // Asignar un valor vacío por defecto
      this.apellido = (await this.perfilService.getSession('apellido')) || '';
      this.codigo = Number(await this.perfilService.getSession("idpersona")); 
    } catch (error) {
      console.error('Error al cargar los datos de la sesión', error);
    }
  }

  lcontactos() 
  {
    let datos = {
      "accion": 'lcontactos',
      "codigo": this.cod_persona,
    };
    this.servicio.postData(datos).subscribe((res:any)=>{
      if (res.estado==true) 
        {
        this.contactos=res.data;
        } 
        else
        {
        this.servicio.showToast(res.mensaje, 2000);
      }
    });
  }

  ngOnInit() {}

  goToProfile() {
    this.navCtrl.navigateForward('/perfil');
  }

  logout() {
    this.router.navigate(['/home']);
    this.menuCtrl.close();
  }
}
