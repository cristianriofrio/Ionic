import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
numeros:Array<number>=[1,2,3,4,5,6,7,8,9,10];
resultado:string="";

  constructor() {}
  mostrar(seleccion:number)
  {
    this.resultado=seleccion.toString();
  }
}
