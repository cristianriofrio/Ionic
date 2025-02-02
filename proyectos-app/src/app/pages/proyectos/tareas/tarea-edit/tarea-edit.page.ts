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
  IonToolbar,
  IonCheckbox
} from '@ionic/angular/standalone';
import {ProyectoService} from "../../../../services/proyecto.service";
import {routes} from "../../../../app.routes";
import {ActivatedRoute, Router} from "@angular/router";
import {NavbarComponent} from "../../../../shared/navbar/navbar.component";

@Component({
  selector: 'app-book-edit',
  templateUrl: './tarea-edit.page.html',
  styleUrls: ['./tarea-edit.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonLabel, IonInput, IonTextarea, IonButton, ReactiveFormsModule, IonCheckbox, NavbarComponent]
})
export class TareaEditPage implements OnInit {

  id: string | null = null;
  proyectoId: string | null = null;
  formulario: FormGroup;
  tarea: any;

  constructor(private fb: FormBuilder, private proyectoService: ProyectoService, private router: Router, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.proyectoId = this.route.snapshot.paramMap.get('proyectoId');
    // Inicializar el formulario
    this.formulario = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      estado: [false],
    });
  }

  ngOnInit() {
    this.proyectoService.getTareaById(Number(this.id)).subscribe(proyecto => {
      this.tarea = proyecto;
      this.formulario.setValue({titulo: this.tarea.titulo, descripcion: this.tarea.descripcion, estado: this.tarea.estado});
      console.log('Tarea recibida:', this.tarea);
    })
  }

  onCheckboxChange(event: any) {
    this.formulario.patchValue({ estado: event.detail.checked ? 1 : 0 });
  }

  onSubmit() {
    if (this.formulario.valid) {
      let datosFormulario = this.formulario.value;
      datosFormulario.id_usuario = Number(localStorage.getItem('user_id'));
      datosFormulario.id = this.id
      console.log(datosFormulario)
      this.proyectoService.updateTarea(datosFormulario.id, datosFormulario.titulo, datosFormulario.descripcion, datosFormulario.estado).subscribe(
        (response) => {
          console.log('Tarea creado con éxito:', response);

        },
        (error) => {
          console.error('Error al crear el proyecto:', error);
        },
        () => {
          this.router.navigate(['/proyectos/details/'+this.proyectoId]);
        }
      );
    }
  }

}
