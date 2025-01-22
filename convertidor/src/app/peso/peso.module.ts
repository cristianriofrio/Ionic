import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PesoPage } from './peso.page';

const routes: Routes = [
  {
    path: '',
    component: PesoPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class PesoPageModule {}
