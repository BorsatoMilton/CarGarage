import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmRentComponent } from './confirm-rent.component';

describe('ConfirmRentComponent', () => {
  let component: ConfirmRentComponent;
  let fixture: ComponentFixture<ConfirmRentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmRentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
