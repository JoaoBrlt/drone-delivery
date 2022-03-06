import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DroneTrackingPageComponent } from './drone-tracking-page.component';

const routes: Routes = [
  {
    path: '',
    component: DroneTrackingPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DroneTrackingPageRoutingModule {}
