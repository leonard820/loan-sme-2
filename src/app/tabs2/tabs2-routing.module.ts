import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Tabs2Page } from './tabs2.page';

const routes: Routes = [
  {
    path: 'tabs2',
    component: Tabs2Page,
    children: [
      {
        path: 'admin-home',
        loadChildren: () => import('../admin-home/admin-home.module').then(m => m.AdminHomePageModule)
      },
      {
        path: 'calculator',
        loadChildren: () => import('../calculator/calculator.module').then(m => m.CalculatorPageModule)
      },
      {
        path: 'document',
        loadChildren: () => import('../documentation/documentation.module').then(m => m.DocumentationPageModule)
      },
      {
        path: 'admin-profile',
        loadChildren: () => import('../admin-profile/admin-profile.module').then(m => m.AdminProfilePageModule)
      },
      {
        path: 'apply',
        loadChildren: () => import('../apply/apply.module').then(m => m.ApplyPageModule)
      },
      {
        path: 'admin-loan',
        loadChildren: () => import('../admin-loan/admin-loan.module').then( m => m.AdminLoanPageModule)
      },
      {
        path: 'loan-details',
        loadChildren: () => import('../loan-details/loan-details.module').then( m => m.LoanDetailsPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs2/admin-home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs2/admin-home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class Tabs2PageRoutingModule {}
