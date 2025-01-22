import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
txt_n1: string="";
txt_n2: string="";
txt_r: string="";

  constructor() {}
sumar()
{
  var r = parseFloat(this.txt_n1) + parseFloat(this.txt_n2);
  this.txt_r=r.toString();
}
restar()
{
  var r = parseFloat(this.txt_n1) - parseFloat(this.txt_n2);
  this.txt_r=r.toString();
}
multiplicar()
{
  var r = parseFloat(this.txt_n1) * parseFloat(this.txt_n2);
  this.txt_r=r.toString();
}
dividir()
{
  var r = parseFloat(this.txt_n1) / parseFloat(this.txt_n2);
  this.txt_r=r.toString();
}
}
