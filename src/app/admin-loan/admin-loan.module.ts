import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminLoanPageRoutingModule } from './admin-loan-routing.module';

import { AdminLoanPage } from './admin-loan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminLoanPageRoutingModule
  ],
  declarations: [AdminLoanPage]
})
export class AdminLoanPageModule {}
