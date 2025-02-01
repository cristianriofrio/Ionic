import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccesoService } from '../servicio/acceso.service';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false,
})
export class PerfilPage implements OnInit {

  perfilForm: FormGroup;
  cedula: string = '';  // Inicializar como una cadena vacía
  nombre: string = '';   // Inicializar como una cadena vacía
  apellido: string = '';
  correo: string = '';   // Inicializar como una cadena vacía
  codigo: number = 0

  constructor(
    private fb: FormBuilder,
    private perfilService: AccesoService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private navigate: NavController
  ) { 
    this.perfilForm = this.fb.group({
      cedula: ['', [Validators.required]],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    this.cargarDatosSesion();
  }

  async cargarDatosSesion() {
    try {
      // Esperar a que se obtengan los valores de la sesión
      this.codigo = Number(await this.perfilService.getSession("idpersona"));  // Asignar un valor vacío por defecto
      this.cedula = await this.perfilService.getSession("cedula") || '';  // Asignar un valor vacío por defecto
      this.nombre = await this.perfilService.getSession("nombre") || '';  // Asignar un valor vacío por defecto
      this.apellido = await this.perfilService.getSession("apellido") || '';
      this.correo = await this.perfilService.getSession("correo") || '';  // Asignar un valor vacío por defecto

      // Ahora que los datos están disponibles, inicializamos el formulario
      this.perfilForm = this.fb.group({
        cedula: [this.cedula, [Validators.required]],
        nombre: [this.nombre, [Validators.required, Validators.minLength(3)]],
        apellido: [this.apellido, [Validators.required, Validators.minLength(3)]],
        correo: [this.correo, [Validators.required, Validators.email]],
      });
    } catch (error) {
      console.error("Error al cargar los datos de la sesión", error);
    }
  }

  // Guardar cambios en el perfil
  guardarCambios() {
    if (this.perfilForm.invalid) {
      this.mostrarAlerta('Error', 'Por favor, completa todos los campos correctamente.');
      return;
    }

    const datos = { ...this.perfilForm.value, codigo: this.codigo };

    console.log(datos)
    this.perfilService.actualizarPerfil(datos).subscribe(
      (res: any) => {
        if (res.estado) {
          this.mostrarAlerta('Éxito', 'Datos actualizados con éxito.');
        } else {
          this.mostrarAlerta('Error', res.mensaje);
        }
      },
      (error) => {
        console.error('Error al actualizar el perfil:', error);
      }
    );
  }

  // Mostrar alerta
  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }

  regresar(){
    this.navigate.navigateForward("/menu");
  }
}
