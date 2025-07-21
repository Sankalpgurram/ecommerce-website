import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeedpageComponent } from './seedpage.component';

describe('SeedpageComponent', () => {
  let component: SeedpageComponent;
  let fixture: ComponentFixture<SeedpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeedpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeedpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
