import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginadosPage } from './paginados.page';

const routes: Routes = [
  {
    path: '',
    component: PaginadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaginadosPageRoutingModule {}
