import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleDroneMapComponent } from './single-drone-map.component';

describe('SingleDroneMapComponent', () => {
  let component: SingleDroneMapComponent;
  let fixture: ComponentFixture<SingleDroneMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleDroneMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleDroneMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
