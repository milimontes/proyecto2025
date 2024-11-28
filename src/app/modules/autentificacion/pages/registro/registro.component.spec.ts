// Importaciones necesarias para realizar pruebas en Angular
import { ComponentFixture, TestBed } from '@angular/core/testing';  // ComponentFixture y TestBed son necesarios para probar componentes en Angular
import { RegistroComponent } from './registro.component';  // Importación del componente que se va a probar

// Bloque describe que define un conjunto de pruebas para el componente 'RegistroComponent'
describe('RegistroComponent', () => {
  // Variables para almacenar el componente y su fixture de prueba
  let component: RegistroComponent;  // Variable para la instancia del componente
  let fixture: ComponentFixture<RegistroComponent>;  // Variable para la fixture del componente (proporciona acceso al DOM y detección de cambios)

  // Antes de cada prueba, configura el entorno de pruebas y crea una instancia del componente
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroComponent]  // Declara el componente que se va a probar
    });
    
    // Crea la fixture, que es una instancia del componente en el entorno de prueba
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;  // Asocia la fixture al componente
    fixture.detectChanges();  // Detecta los cambios en el DOM y actualiza la vista
  });

  // Prueba unitaria que verifica si el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy();  // Verifica que la instancia del componente se haya creado correctamente
  });
});
