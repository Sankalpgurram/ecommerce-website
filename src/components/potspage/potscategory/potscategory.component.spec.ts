import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotscategoryComponent } from './potscategory.component';

describe('PotscategoryComponent', () => {
  let component: PotscategoryComponent;
  let fixture: ComponentFixture<PotscategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PotscategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PotscategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
