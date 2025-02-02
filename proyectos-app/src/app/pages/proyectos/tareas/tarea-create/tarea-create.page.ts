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
import {ProyectoService} from "../../../../services/proyecto.service";
import {routes} from "../../../../app.routes";
import {ActivatedRoute, Router} from "@angular/router";
import {NavbarComponent} from "../../../../shared/navbar/navbar.component";

@Component({
  selector: 'app-book-create',
  templateUrl: './tarea-create.page.html',
  styleUrls: ['./tarea-create.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonLabel, IonInput, IonTextarea, IonButton, ReactiveFormsModule, NavbarComponent]
})
export class TareaCreatePage implements OnInit {

  proyectoId: string | null = null;
  formulario: FormGroup;

  constructor(private fb: FormBuilder, private proyectoService: ProyectoService, private router: Router, private route: ActivatedRoute) {
    this.proyectoId = this.route.snapshot.paramMap.get('proyectoId');
    // Inicializar el formulario
    this.formulario = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  // Método para enviar el formulario
  onSubmit() {
    if (this.formulario.valid) {
      let datosFormulario = this.formulario.value;
      this.proyectoService.createTarea(Number(this.proyectoId), datosFormulario.titulo, datosFormulario.descripcion).subscribe(
        (response) => {
          console.log('Tarea creada con éxito:', response);

        },
        (error) => {
          console.error('Error al crear la tarea:', error);
        },
        () => {
          this.router.navigate(['/proyectos/details/'+this.proyectoId]);
        }
      );
    }
  }

}
