import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaginadosPageRoutingModule } from './paginados-routing.module';

import { PaginadosPage } from './paginados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaginadosPageRoutingModule
  ],
  declarations: [PaginadosPage]
})
export class PaginadosPageModule {}
