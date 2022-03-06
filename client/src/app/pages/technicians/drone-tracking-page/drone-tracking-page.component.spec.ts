import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DroneTrackingPageComponent } from './drone-tracking-page.component';

describe('DroneTrackingPageComponent', () => {
  let component: DroneTrackingPageComponent;
  let fixture: ComponentFixture<DroneTrackingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DroneTrackingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DroneTrackingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
