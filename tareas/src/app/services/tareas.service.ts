import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  private STORAGE_KEY = 'tareas'; // 'tareas' : clave que usa como identificador 
  constructor(
    private ToastCtrl: ToastController
  ) { }

  // Guardar una nueva tarea
  async saveTarea(tarea: any): Promise<void>{ // tarea: un objeto que representa un tarea
    const tareas = await this.getTareas();
    tareas.push(tarea);
    await Preferences.set({key: this.STORAGE_KEY, value: JSON.stringify(tareas) //Lo convierte a json y luego lo almacena
    });
  }

  // Obtener todas las tareas
  async getTareas(): Promise<any[]> {
    const {value} = await Preferences.get({ key: this.STORAGE_KEY})
    return value ? JSON.parse(value) : [];
  }

  
  // Actualizar las tareas
  async updateTareas(tareas: any[]): Promise<void> {
    await Preferences.set({ key: this.STORAGE_KEY, value: JSON.stringify(tareas) });
  }

  async deleteTarea(index: number): Promise<void> {
    const tareas = await this.getTareas();
    tareas.splice(index, 1);
    await Preferences.set({ key:this.STORAGE_KEY, value: JSON.stringify(tareas)});
  }

  // Limpiar todas las tareas
  async clearTareas(): Promise<void> {
    await Preferences.remove({ key: this.STORAGE_KEY });
  }

  async showToast(mensaje: string, tiempo:number)
    {
      const toast= await this.ToastCtrl.create({
        message: mensaje,
        duration: tiempo,
        position: 'top'
      });
      toast.present();
    }
}