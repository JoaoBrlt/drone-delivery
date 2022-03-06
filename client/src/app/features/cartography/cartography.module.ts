import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { MapComponent } from './components/map/map.component';
import { MultipleDroneMapComponent } from './components/multiple-drone-map/multiple-drone-map.component';
import { SingleDroneMapComponent } from './components/single-drone-map/single-drone-map.component';

const components = [
  MapComponent,
  MultipleDroneMapComponent,
  SingleDroneMapComponent
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    SharedModule
  ],
  exports: [
    ...components
  ],
})
export class CartographyModule {}
