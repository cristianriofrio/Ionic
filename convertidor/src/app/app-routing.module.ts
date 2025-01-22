import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
  },
  {
    path: 'distancia',
    loadChildren: () => import('./distancia/distancia.module').then(m => m.DistanciaPageModule),
  },
  {
    path: 'peso',
    loadChildren: () => import('./peso/peso.module').then(m => m.PesoPageModule),
  },
  {
    path: 'temperatura',
    loadChildren: () => import('./temperatura/temperatura.module').then(m => m.TemperaturaPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
