import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotspageComponent } from './potspage.component';

describe('PotspageComponent', () => {
  let component: PotspageComponent;
  let fixture: ComponentFixture<PotspageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PotspageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PotspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
