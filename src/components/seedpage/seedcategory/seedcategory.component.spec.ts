import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeedcategoryComponent } from './seedcategory.component';

describe('SeedcategoryComponent', () => {
  let component: SeedcategoryComponent;
  let fixture: ComponentFixture<SeedcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeedcategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeedcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
