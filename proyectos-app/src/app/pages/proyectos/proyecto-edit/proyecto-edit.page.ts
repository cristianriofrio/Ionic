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
  selector: 'app-book-edit',
  templateUrl: './proyecto-edit.page.html',
  styleUrls: ['./proyecto-edit.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonLabel, IonInput, IonTextarea, IonButton, ReactiveFormsModule, NavbarComponent]
})
export class ProyectoEditPage implements OnInit {

  id: string | null = null;
  formulario: FormGroup;
  proyecto: any;

  constructor(private fb: FormBuilder, private proyectoService: ProyectoService, private router: Router, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    // Inicializar el formulario
    this.formulario = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.proyectoService.getProyectoById(Number(this.id)).subscribe(proyecto => {
      this.proyecto = proyecto;
      this.formulario.setValue({titulo: this.proyecto.titulo, descripcion: this.proyecto.descripcion});
      console.log('Proyecto recibido:', this.proyecto);
    })
  }

  onSubmit() {
    if (this.formulario.valid) {
      let datosFormulario = this.formulario.value;
      datosFormulario.id_usuario = Number(localStorage.getItem('user_id'));
      datosFormulario.id = this.id
      console.log(datosFormulario)
      this.proyectoService.updateProyecto(datosFormulario).subscribe(
        (response) => {
          console.log('Proyecto creado con éxito:', response);

        },
        (error) => {
          console.error('Error al crear el proyecto:', error);
        },
        () => {
          this.router.navigate(['/proyectos']);
        }
      );
    }
  }

}
