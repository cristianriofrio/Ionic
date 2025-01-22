import { AccesoService } from '../servicio/acceso.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
txt_usuario: string = "";
txt_clave: string = "";  
  constructor( private servicio: AccesoService

  ) {}

  login()
  {
    let datos={
      accion:'login',
      usuario:this.txt_usuario,
      clave:this.txt_clave
    }
    this.servicio.postData(datos).subscribe((res:any)=>{
      if(res.estado)
      {
        this.servicio.showToast("Encontro persona",3000);

      }
      else
      {
        this.servicio.showToast("No existe esa persona",3000);
      }
    });
  }
  

  crearCuenta()
  {

  }

  reestablecerClave()
  {

  }

}