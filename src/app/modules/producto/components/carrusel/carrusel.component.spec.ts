// Importa las herramientas necesarias para realizar pruebas en Angular
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Importa el componente que será probado
import { CarruselComponent } from './carrusel.component';

describe('CarruselComponent', () => {
  let component: CarruselComponent;  // Instancia del componente que se probará
  let fixture: ComponentFixture<CarruselComponent>;  // Instancia de la "fixture" que crea el entorno de pruebas para el componente

  // Configuración inicial de la prueba
  beforeEach(() => {
    // Configura el módulo de prueba
    TestBed.configureTestingModule({
      declarations: [CarruselComponent]  // Declara el componente que se va a probar
    });
    // Crea la "fixture" que es la representación del componente en el entorno de pruebas
    fixture = TestBed.createComponent(CarruselComponent);
    // Asocia el componente con la "fixture"
    component = fixture.componentInstance;
    // Detecta los cambios del componente (necesario para que las propiedades vinculadas en la plantilla se inicialicen)
    fixture.detectChanges();
  });

  // Test específico que verifica si el componente fue creado correctamente
  it('should create', () => {
    // La prueba debe verificar que el componente haya sido creado correctamente
    expect(component).toBeTruthy();
  });
});
