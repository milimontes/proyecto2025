import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ZapatillasComponent } from './zapatillas.component';

describe('ZapatillasComponent', () => {
  // Declaramos las variables necesarias para el componente y su fixture
  let component: ZapatillasComponent;
  let fixture: ComponentFixture<ZapatillasComponent>;

  // Configuramos el módulo de pruebas antes de cada prueba
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZapatillasComponent] // Declaramos el componente que vamos a probar
    });
    // Creamos una instancia del componente y su fixture
    fixture = TestBed.createComponent(ZapatillasComponent);
    component = fixture.componentInstance; // Obtenemos la instancia del componente
    fixture.detectChanges(); // Detectamos los cambios en la vista del componente
  });

  // Definimos el primer caso de prueba
  it('should create', () => {
    // Verificamos que el componente se haya creado correctamente
    expect(component).toBeTruthy(); // Si el componente es válido, la prueba pasará
  });
});
