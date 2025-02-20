import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversalAlertComponent } from './universal-alert.component';

describe('UniversalAlertComponent', () => {
  let component: UniversalAlertComponent;
  let fixture: ComponentFixture<UniversalAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniversalAlertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniversalAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
