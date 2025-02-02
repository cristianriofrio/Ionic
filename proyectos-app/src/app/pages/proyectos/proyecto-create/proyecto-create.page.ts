import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonTextarea,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {ProyectoService} from "../../../services/proyecto.service";
import {routes} from "../../../app.routes";
import {ActivatedRoute, Router} from "@angular/router";
import {NavbarComponent} from "../../../shared/navbar/navbar.component";

@Component({
  selector: 'app-book-create',
  templateUrl: './proyecto-create.page.html',
  styleUrls: ['./proyecto-create.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonLabel, IonInput, IonTextarea, IonButton, ReactiveFormsModule, NavbarComponent]
})
export class ProyectoCreatePage implements OnInit {

  formulario: FormGroup;
  imagenBase64: string | null = null;

  constructor(private fb: FormBuilder, private proyectoService: ProyectoService, private router: Router) {
    // Inicializar el formulario
    this.formulario = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      imagen: [null],
    });
  }

  ngOnInit() {
  }

  // Método para enviar el formulario
  onSubmit() {
    if (this.formulario.valid) {
      let datosFormulario = this.formulario.value;
      datosFormulario.usuario_id = Number(localStorage.getItem('user_id'));
      this.proyectoService.createProyecto(datosFormulario).subscribe(
        (response) => {
          console.log('Proyecto creado con éxito:', response);

        },
        (error) => {
          console.error('Error al crear el proyecto:', error);
        },
        () => {
          this.router.navigate(['/proyectos']).then(()=>window.location.reload());
        }
      );
    }
  }

}
