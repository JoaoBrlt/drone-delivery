import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class CoreModule {
  /**
   * Constructs the core module.
   * @param parentModule The parent module.
   */
  constructor(
    @Optional() @SkipSelf() parentModule?: CoreModule,
  ) {
    if (parentModule) {
      throw new Error('The core module has already been loaded.');
    }
  }
}
