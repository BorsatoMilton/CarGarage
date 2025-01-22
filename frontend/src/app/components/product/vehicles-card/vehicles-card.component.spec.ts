import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesCardComponent } from './vehicles-card.component';

describe('VehiclesCardComponent', () => {
  let component: VehiclesCardComponent;
  let fixture: ComponentFixture<VehiclesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiclesCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiclesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
