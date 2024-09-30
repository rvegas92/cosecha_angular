import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturaPageComponent } from './lectura-page.component';

describe('LecturaPageComponent', () => {
  let component: LecturaPageComponent;
  let fixture: ComponentFixture<LecturaPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LecturaPageComponent]
    });
    fixture = TestBed.createComponent(LecturaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
