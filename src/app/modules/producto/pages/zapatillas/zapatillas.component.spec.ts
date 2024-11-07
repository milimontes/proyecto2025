import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZapatillasComponent } from './zapatillas.component';

describe('ZapatillasComponent', () => {
  let component: ZapatillasComponent;
  let fixture: ComponentFixture<ZapatillasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZapatillasComponent]
    });
    fixture = TestBed.createComponent(ZapatillasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

