import { Component, OnInit } from '@angular/core';
import { AccesoService } from '../servicio/acceso.service';

@Component({
  selector: 'app-acontacto',
  templateUrl: './acontacto.page.html',
  styleUrls: ['./acontacto.page.scss'],
  standalone: false,
})
export class AcontactoPage implements OnInit {
  contacto: any =[];
  cod_contacto:string="";
  cod_persona:string="";
  txt_nombre:string="";
  txt_apellido:string="";
  txt_telefono:string="";
  txt_correo:string="";
  constructor(
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
      this.contacto=res.data;
      this.txt_nombre=this.contacto.nombre;
      this.txt_nombre=this.contacto.apellido;
      this.txt_nombre=this.contacto.telefono;
      this.txt_nombre=this.contacto.correo;
    }
    else
    {
      this.servicio.showToast(res.mensaje, 3000);
    }
  });
}

  ngOnInit() {
  }

guardar(){}
cancelar(){}
}
