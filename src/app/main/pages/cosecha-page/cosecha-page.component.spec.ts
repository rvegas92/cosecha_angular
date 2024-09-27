import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CosechaPageComponent } from './cosecha-page.component';

describe('CosechaPageComponent', () => {
  let component: CosechaPageComponent;
  let fixture: ComponentFixture<CosechaPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CosechaPageComponent]
    });
    fixture = TestBed.createComponent(CosechaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
