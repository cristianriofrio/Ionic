import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TareasService } from 'src/app/services/tareas.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
  standalone: false,
})
export class ListaPage{
tareas: any[] = [];
  constructor(
    private tareasService: TareasService,
    private navCtrl: NavController
  ) {}
  
  async ngOnInit() {
    this.tareas = await this.tareasService.getTareas();
  }

  async ionViewWillEnter() {
    this.tareas = await this.tareasService.getTareas();
  }

  crearTarea() {
    this.navCtrl.navigateForward('/crear');
  }

  editarTarea(index: number) {
    // Redirige a la página de edición con el índice de la tarea
    this.navCtrl.navigateForward(`/editar/${index}`);
  }

  async eliminarTarea(index: number){
    const confirmacion = confirm('Estás seguro de eliminar la tarea?');
    if(confirmacion){
      await this.tareasService.deleteTarea(index); // llama al metodo delete tarea del servicio // await espera que esta operacion termine antes de continuar con la siguiente
      this.tareas = await this.tareasService.getTareas(); //despues de eliminar la tarea se llama al metodo getTareas para actualizar la lista y luego asigna a this.tareas
      this.tareasService.showToast("Elimado exitosamente",3000);
    }
  }
}