import {Component, OnInit} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle, IonCardContent, IonButton, IonIcon, IonButtons, IonImg, IonRow, IonCol, IonCheckbox,
} from '@ionic/angular/standalone';
import {Router} from "@angular/router";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {ProyectoService} from "../../services/proyecto.service";
import { addIcons } from 'ionicons';
import * as icons from 'ionicons/icons';
import {NavbarComponent} from "../../shared/navbar/navbar.component";
import {DomSanitizer} from "@angular/platform-browser";
import { IonProgressBar } from '@ionic/angular/standalone';
import {AlertController, ToastController} from "@ionic/angular";

@Component({
  selector: 'app-books',
  templateUrl: 'home.page.html',
  standalone: true,
  styleUrls: ['home.page.scss'],
  imports: [IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    NgForOf,
    IonButton,
    IonIcon,
    NgClass, IonButtons,
    IonProgressBar,
    NavbarComponent, IonImg, IonRow, IonCol, NgIf, IonCheckbox],
})
export class HomePage implements OnInit {
  entidades: any[] = []
  rating: number = 2;
  constructor(private router: Router, private proyectoService: ProyectoService, public dms: DomSanitizer, private toastController: ToastController, private alertController: AlertController) {
    addIcons({ ...icons });

  }

  ngOnInit() {
    this.cargarProyectos();
    this.router.events.subscribe(() => {
      this.cargarProyectos();
    });
  }

  cargarProyectos() {
    this.proyectoService.getProyectosById(Number(localStorage.getItem('user_id'))).subscribe((proyectos) => {
      this.entidades = proyectos;
      console.log(proyectos)
    });
  }

  verDetalles(entidad: any) {
    this.router.navigate(['/proyectos/details', entidad.id]);
  }

  setRating(rating: number) {
    this.rating = rating;
  }

  display(b64: string) {
    return this.dms.bypassSecurityTrustUrl(b64);
  }

  agregarLibro() {
    this.router.navigate(['/proyectos/create']);
  }

  validarUsuario(usuario_id: any) {
    return usuario_id === Number(localStorage.getItem('user_id'));
  }

  editarLibro(id:number) {
    this.router.navigate(['/proyectos/edit', id]);
  }

  async eliminarLibro(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que deseas eliminar este proyecto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.proyectoService.deleteProyecto(id).subscribe(() => {
              this.cargarProyectos();
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
