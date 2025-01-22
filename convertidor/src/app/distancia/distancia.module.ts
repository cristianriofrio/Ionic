import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DistanciaPage } from './distancia.page'; 

const routes: Routes = [
  {
    path: '',
    component: DistanciaPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class DistanciaPageModule {}
