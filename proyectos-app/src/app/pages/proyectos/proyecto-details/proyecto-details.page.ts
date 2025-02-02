import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCard,
  IonCardContent, IonCardHeader, IonCardTitle, IonCheckbox, IonCol,
  IonContent,
  IonHeader, IonIcon, IonRow,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {ActivatedRoute, Router} from "@angular/router";
import {ProyectoService} from "../../../services/proyecto.service";
import {NavbarComponent} from "../../../shared/navbar/navbar.component";
import {DomSanitizer} from "@angular/platform-browser";
import {addIcons} from "ionicons";
import * as icons from "ionicons/icons";
import {AlertController, ToastController} from "@ionic/angular";

@Component({
  selector: 'app-book-details',
  templateUrl: './proyecto-details.page.html',
  styleUrls: ['./proyecto-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonIcon, IonRow, NavbarComponent, IonCheckbox]
})
export class ProyectoDetailsPage implements OnInit {
  id: string | null = null;
  proyecto: any;
  tareas: any[] = [];
  rating: number = 0;

  constructor(private route: ActivatedRoute, private proyectoService: ProyectoService,  public dms: DomSanitizer, private toastController: ToastController, private router: Router, private alertController: AlertController) {
    console.log('Constructor de BookDetailsPage');
    addIcons({ ...icons });
  }

  ngOnInit() {
    // Obtener el parámetro 'id' de la ruta
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('ID recibido:', this.id);
    this.proyectoService.getProyectoById(parseInt(this.id || '')).subscribe(proyecto => {
      this.proyecto = proyecto;
      console.log('Proyecto recibido:', this.proyecto);
      this.loadTareas()
    });

    this.router.events.subscribe(() => {
      this.loadTareas();
    });
  }

  display(b64: string) {
    return this.dms.bypassSecurityTrustUrl("data:image/jpeg;base64," + b64);
  }



  loadTareas() {
    this.proyectoService.getTareas(this.proyecto.id).subscribe(tareas => {
      this.tareas = tareas;
      for (let tarea of this.tareas) {
        console.log(tarea.id_usuario);
        console.log(localStorage.getItem('user_id'));
        if (tarea.id_usuario === Number(localStorage.getItem('user_id'))) {
          this.rating = tarea.puntuacion
          console.log('Usuario actual:', localStorage.getItem('user_id'));
        }
      }
      console.log('Reseñas recibidas:', this.tareas);
    });
  }

  addTarea(){
    this.router.navigate(['proyectos/'+this.id+'/tareas/create']);
  }


  // addTarea() {
  //   const user_id: number = Number(localStorage.getItem('user_id'));
  //   this.proyectoService.createTarea(this.proyecto.id,"titulo", "descripcion").subscribe(() => {
  //     this.loadTareas();
  //     const toast = this.toastController.create({
  //       message: 'Tu reseña ha sido agregada/actualizada con éxito.',
  //       duration: 2000,
  //       color: 'warning',
  //     });
  //     toast.then(t => t.present());
  //   });
  // }

  editTarea(id:number) {
    this.router.navigate(['proyectos/'+this.id+'/tareas/edit', id]);
  }

  async eliminarTarea(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que deseas eliminar esta tarea?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.proyectoService.deleteTarea(id).subscribe(() => {
              this.loadTareas();
              this.toastController.create({
                message: 'Tarea eliminada con éxito.',
                duration: 2000,
                color: 'danger',
              }).then(toast => toast.present());
            });
          }
        }
      ]
    });

    await alert.present();
  }

}
