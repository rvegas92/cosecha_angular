import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequerimientoPageComponent } from './requerimiento-page.component';

describe('RequerimientoPageComponent', () => {
  let component: RequerimientoPageComponent;
  let fixture: ComponentFixture<RequerimientoPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequerimientoPageComponent]
    });
    fixture = TestBed.createComponent(RequerimientoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
