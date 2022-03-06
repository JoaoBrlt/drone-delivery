import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // Empty path.
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard'
  },

  // Dashboard.
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard-page.module').then(
        (m) => m.DashboardPageModule,
      )
  },

  // Customers.
  {
    path: 'customers',
    loadChildren: () =>
      import('./pages/customers/customer-pages.module').then(
        (m) => m.CustomerPagesModule,
      )
  },

  // Technicians.
  {
    path: 'technicians',
    loadChildren: () =>
      import('./pages/technicians/technician-pages.module').then(
        (m) => m.TechnicianPagesModule,
      )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
