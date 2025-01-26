import { Component, OnInit, Inject } from '@angular/core';
import { TareasService } from '../../services/tareas.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-crear-eliminar',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
  standalone: false,
})
export class CrearEliminarPage implements OnInit {
  tareas: any[] = []; 
  tarea = {
    titulo: '',
    descripcion: '',
    estado: ''
  };

  async ngOnInit() {
      this.tareas = await this.tareasService.getTareas();
  }
  constructor(
    @Inject(TareasService) private tareasService: TareasService,
    private navCtrl: NavController
  ) { }

  // Crear tarea
  async crearTarea() {
    if (this.tarea.titulo && this.tarea.descripcion && this.tarea.estado) {
      await this.tareasService.saveTarea(this.tarea);
      this.tareas = await this.tareasService.getTareas(); // Actualizar la lista
      this.tareasService.showToast("Creado exitosamente",3000);
      this.navCtrl.navigateForward('/lista')

      // Resetear el formulario
      //this.tarea = { titulo: '', descripcion: '', estado: '' };
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }
  // Eliminar tarea
  async eliminarTarea(index: number) {
    await this.tareasService.deleteTarea(index);
    this.tareas = await this.tareasService.getTareas();
  }
  
  async cancelar() {
    // Navegar a la pantalla principal (modifica la ruta según sea necesario)
    this.navCtrl.navigateForward('/lista'); // Redirect to the list page
    }
}