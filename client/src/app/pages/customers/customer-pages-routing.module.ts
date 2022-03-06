import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // Delivery tracking.
  {
    path: 'deliveries/:id',
    loadChildren: () =>
      import('./delivery-tracking-page/delivery-tracking-page.module').then(
        (m) => m.DeliveryTrackingPageModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerPagesRoutingModule {}
