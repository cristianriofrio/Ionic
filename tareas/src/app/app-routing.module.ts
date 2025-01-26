import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'lista',
    pathMatch: 'full'
  },
  {
    path: 'lista',
    loadChildren: () => import('./tareas/lista/lista.module').then( m => m.ListaPageModule)
  },
  {
    path: 'crear',
    loadChildren: () => import('./tareas/crear/crear.module').then( m => m.CrearEliminarPageModule)
  },
  {
    path: 'detalles',
    loadChildren: () => import('./tareas/detalles/detalles.module').then( m => m.DetallesPageModule)
  },
  {
    path: 'editar/:id',
    loadChildren: () => import('./tareas/editar/editar.module').then( m => m.EditarPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }