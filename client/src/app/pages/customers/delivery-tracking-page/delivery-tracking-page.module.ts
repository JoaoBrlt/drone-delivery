import { NgModule } from '@angular/core';
import { DeliveryTrackingPageComponent } from './delivery-tracking-page.component';
import { DeliveryTrackingPageRoutingModule } from './delivery-tracking-page-routing.module';
import { SharedModule } from '@shared/shared.module';
import { CartographyModule } from '@features/cartography/cartography.module';

@NgModule({
  declarations: [
    DeliveryTrackingPageComponent
  ],
  imports: [
    SharedModule,
    DeliveryTrackingPageRoutingModule,
    CartographyModule
  ]
})
export class DeliveryTrackingPageModule {}
