import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-peso',
  templateUrl: './peso.page.html',
  styleUrls: ['./peso.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
})

export class PesoPage {
  valor: number = 0; 
  unidadEntrada: string = '';
  unidadSalida: string = '';
  resultado: number = 0;

  conversiones: { [key: string]: number } = {
    ton: 1000000, 
    kg: 1000,     
    lb: 453.592, 
    g: 1,   
  };
  
  constructor(private router: Router) {}

  goToPage(path: string) {
    this.router.navigateByUrl(path);
  }

  calcular() {
    if (!this.valor || !this.unidadEntrada || !this.unidadSalida) {
      this.resultado = 0; 
      return;
    }

    const valorEnGramos = this.valor * this.conversiones[this.unidadEntrada];
    this.resultado = valorEnGramos / this.conversiones[this.unidadSalida];
  }
}