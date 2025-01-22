import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemperaturaPage } from './temperatura.page'; 

const routes: Routes = [
  {
    path: '',
    component: TemperaturaPage, 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TemperaturaPageModule {}
