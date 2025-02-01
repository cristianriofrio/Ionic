import { Component, OnInit } from '@angular/core';
import { AccesoService } from '../servicio/acceso.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-econtacto',
  templateUrl: './econtacto.page.html',
  styleUrls: ['./econtacto.page.scss'],
  standalone: false,
})
export class EcontactoPage implements OnInit {
  contacto: any =[];
  cod_contacto:string="";
  cod_persona:string="";
  txt_nombre:string="";
  txt_apellido:string="";
  txt_telefono:string="";
  txt_correo:string="";
  
  public botones=[
    {
      text:'No',
      role:'alert-button-cancel',
      handler: () => {
        this.cancelar();
      },
    },
    {
      text:'Si',
      role:'alert-button-confirmed',
      handler: () => {
        this.eliminar();
      }, 
    },
  ]
  constructor(
    private navCtrl: NavController,
    private servicio: AccesoService)
    {
      this.servicio.getSession("cod_contacto").then((res:any)=>{
        this.cod_contacto=res;
        this.cargarDatos();
      });
    }
cargarDatos()
{
  let datos={
    "accion":"dcontacto",
    "cod_contacto":this.cod_contacto,
  }
  this.servicio.postData(datos).subscribe((res:any)=>{
    if(res.estado)
    {
      this.contacto=res.datos;
      this.txt_nombre=this.contacto.nombre;
      this.txt_apellido=this.contacto.apellido;
      this.txt_telefono=this.contacto.telefono;
      this.txt_correo=this.contacto.correo;
    }
    else
    {
      this.servicio.showToast(res.mensaje, 3000);
    }
  });
}
ngOnInit() {
}

eliminar()
{
  let datos={
    "accion":"econtacto",
    "cod_contacto":this.cod_contacto
  }
  this.servicio.postData(datos).subscribe((res:any)=>{
    if(res.estado)
    {
      this.servicio.showToast(res.mensaje, 3000);
      this.navCtrl.navigateRoot('/menu');
    }
    else
    {
      this.servicio.showToast(res.mensaje, 3000);
    }
  });
}
cancelar(){
  this.navCtrl.navigateRoot('/menu');
}
}