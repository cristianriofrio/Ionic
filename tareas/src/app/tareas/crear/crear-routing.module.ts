import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearEliminarPage } from './crear.page';

const routes: Routes = [
  {
    path: '',
    component: CrearEliminarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearEliminarPageRoutingModule {}