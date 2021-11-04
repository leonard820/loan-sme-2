import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminLoanPage } from './admin-loan.page';

const routes: Routes = [
  {
    path: '',
    component: AdminLoanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminLoanPageRoutingModule {}
