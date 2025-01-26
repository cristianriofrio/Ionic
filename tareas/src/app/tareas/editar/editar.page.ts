import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { TareasService } from 'src/app/services/tareas.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
  standalone: false,
})
export class EditarPage implements OnInit {

  tarea: any = { titulo: '', descripcion: '', estado: ''};
  index: number | undefined;
  constructor(
    private route: ActivatedRoute,
    private tareasService: TareasService,
    private navCtrl: NavController
  ) { }

  async ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id'); 
    if (idParam !== null) {
      this.index = +idParam; 
      const tareas = await this.tareasService.getTareas();
      this.tarea = tareas[this.index];
    } else {
      console.error('No se encuentra el id');
      this.navCtrl.navigateBack('/some-default-route');
    }
  }

  async guardarCambios(){
    const tareas = await this.tareasService.getTareas();
    if (this.index !== undefined) {
      tareas[this.index] = this.tarea; // Update the task in the array
      await this.tareasService.updateTareas(tareas); // Save the updated list
      this.tareasService.showToast("Guardado exitosamente",3000);
      this.navCtrl.navigateForward('/lista'); // Redirect to the list page
    }
  }
  async cancelar() {
    // Navegar a la pantalla principal (modifica la ruta según sea necesario)
    this.navCtrl.navigateForward('/lista'); // Redirect to the list page
    }
  }
