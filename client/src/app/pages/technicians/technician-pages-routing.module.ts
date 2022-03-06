import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // Drone tracking.
  {
    path: 'drones',
    loadChildren: () =>
      import('./drone-tracking-page/drone-tracking-page.module').then(
        (m) => m.DroneTrackingPageModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TechnicianPagesRoutingModule {}
