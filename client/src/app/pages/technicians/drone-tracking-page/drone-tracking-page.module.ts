import { NgModule } from '@angular/core';
import { DroneTrackingPageComponent } from './drone-tracking-page.component';
import { DroneTrackingPageRoutingModule } from './drone-tracking-page-routing.module';
import { CartographyModule } from '@features/cartography/cartography.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    DroneTrackingPageComponent
  ],
  imports: [
    SharedModule,
    DroneTrackingPageRoutingModule,
    CartographyModule
  ]
})
export class DroneTrackingPageModule {}
