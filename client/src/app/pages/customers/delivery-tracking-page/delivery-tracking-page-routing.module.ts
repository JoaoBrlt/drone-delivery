import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveryTrackingPageComponent } from './delivery-tracking-page.component';

const routes: Routes = [
  {
    path: '',
    component: DeliveryTrackingPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryTrackingPageRoutingModule {}
