import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvioPageComponent } from './envio-page.component';

describe('EnvioPageComponent', () => {
  let component: EnvioPageComponent;
  let fixture: ComponentFixture<EnvioPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnvioPageComponent]
    });
    fixture = TestBed.createComponent(EnvioPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
