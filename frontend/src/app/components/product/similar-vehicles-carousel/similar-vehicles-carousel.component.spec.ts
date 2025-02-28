import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarVehiclesCarouselComponent } from './similar-vehicles-carousel.component';

describe('SimilarVehiclesCarouselComponent', () => {
  let component: SimilarVehiclesCarouselComponent;
  let fixture: ComponentFixture<SimilarVehiclesCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimilarVehiclesCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimilarVehiclesCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
