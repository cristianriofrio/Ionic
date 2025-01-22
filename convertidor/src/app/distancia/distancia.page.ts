import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-distancia',
  templateUrl: './distancia.page.html',
  styleUrls: ['./distancia.page.scss'],
  standalone: true, 
  imports: [CommonModule, IonicModule, FormsModule], 
})

export class DistanciaPage {
  valor: number = 0; 
  unidadEntrada: string = ''; 
  unidadSalida: string = ''; 
  resultado: number = 0; 

  conversiones: { [key: string]: number } = {
    km: 1000000, 
    m: 1000,     
    cm: 10,      
    mm: 1,       
  };

  constructor(private router: Router) { }
  goToPage(path: string) {
    this.router.navigateByUrl(path);
  }

   calcular() {
    if (!this.valor || !this.unidadEntrada || !this.unidadSalida) {
      this.resultado = 0; 
      return;
    }

    const valorEnMilimetros = this.valor * this.conversiones[this.unidadEntrada];
    this.resultado = valorEnMilimetros / this.conversiones[this.unidadSalida];
  }

}
