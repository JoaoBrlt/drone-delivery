import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryTrackingPageComponent } from './delivery-tracking-page.component';

describe('DeliveryTrackingPageComponent', () => {
  let component: DeliveryTrackingPageComponent;
  let fixture: ComponentFixture<DeliveryTrackingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryTrackingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryTrackingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
