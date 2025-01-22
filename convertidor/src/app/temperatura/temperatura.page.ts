import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-temperatura',
  templateUrl: './temperatura.page.html',
  styleUrls: ['./temperatura.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
})

export class TemperaturaPage {

  valor: number = 0;
  resultado: string = '';

  deCelsius: boolean = false;
  deFahrenheit: boolean = false;
  deKelvin: boolean = false;

  aCelsius: boolean = false;
  aFahrenheit: boolean = false;
  aKelvin: boolean = false;

  constructor(private router: Router) { }
  
  goToPage(path: string) {
    this.router.navigateByUrl(path);
  }
  
  calcular() {
    if (!this.valor || !(this.deCelsius || this.deFahrenheit || this.deKelvin)) {
      this.resultado = '';
      return;
    }

    let resultados: string[] = [];

    if (this.deCelsius) {
      if (this.aFahrenheit) resultados.push(`${this.valor * 9 / 5 + 32} °F`);
      if (this.aKelvin) resultados.push(`${this.valor + 273.15} K`);
    }

    if (this.deFahrenheit) {
      if (this.aCelsius) resultados.push(`${(this.valor - 32) * 5 / 9} °C`);
      if (this.aKelvin) resultados.push(`${((this.valor - 32) * 5 / 9) + 273.15} K`);
    }

    if (this.deKelvin) {
      if (this.aCelsius) resultados.push(`${this.valor - 273.15} °C`);
      if (this.aFahrenheit) resultados.push(`${((this.valor - 273.15) * 9 / 5) + 32} °F`);
    }

    this.resultado = resultados.join(', ');
  }
}