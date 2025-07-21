import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantCategoryComponent } from './plant-category.component';

describe('PlantCategoryComponent', () => {
  let component: PlantCategoryComponent;
  let fixture: ComponentFixture<PlantCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
