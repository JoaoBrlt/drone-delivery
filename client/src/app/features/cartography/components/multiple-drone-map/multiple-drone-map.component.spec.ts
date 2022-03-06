import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleDroneMapComponent } from './multiple-drone-map.component';

describe('MultipleDroneMapComponent', () => {
  let component: MultipleDroneMapComponent;
  let fixture: ComponentFixture<MultipleDroneMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleDroneMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleDroneMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
