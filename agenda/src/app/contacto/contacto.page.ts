import { Component, OnInit } from '@angular/core';
import { AccesoService } from '../servicio/acceso.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
  standalone: false,
  
})
export class ContactoPage implements OnInit {
cod_persona:string="";
txt_nombre:string="";
txt_apellido:string="";
txt_telefono:string="";
txt_correo:string="";
mensaje:string="";

  constructor (
    private servicio:AccesoService,
    private navCtrl: NavController
  ) 
  { 
    this.servicio.getSession("idpersona").then((res:any)=>{
      this.cod_persona=res;
    });
  }
 verificarnumero(){}
 
 cancelar(){}

 guardar() 
  {
    let datos={
      "accion":"nuevoc",
      "cod_persona":this.cod_persona,
      "nombre":this.txt_nombre,
      "apellido":this.txt_apellido,
      "telefono":this.txt_telefono,
      "correo":this.txt_correo 
    }
    this.servicio.postData(datos).subscribe((res:any)=>{
      if(res.estado==true)
      {
        this.servicio.showToast(res.mensaje,3000);
        this.navCtrl.back();
      }
      else
      {
        this.servicio.showToast(res.mensaje,3000);
      }
    });
  }

  ngOnInit() {
  }

}
