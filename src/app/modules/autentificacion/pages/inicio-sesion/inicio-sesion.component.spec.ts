// Importaciones necesarias para realizar pruebas en Angular
import { ComponentFixture, TestBed } from '@angular/core/testing';  // ComponentFixture y TestBed son necesarios para realizar pruebas sobre componentes de Angular
import { InicioSesionComponent } from './inicio-sesion.component';  // Importación del componente que se va a probar

// Bloque describe que agrupa las pruebas relacionadas con el componente 'InicioSesionComponent'
describe('InicioSesionComponent', () => {
  // Declaración de las variables necesarias para el componente y su fixture
  let component: InicioSesionComponent;  // Variable para la instancia del componente
  let fixture: ComponentFixture<InicioSesionComponent>;  // Variable para la fixture del componente

  // Se ejecuta antes de cada prueba individualmente
  beforeEach(() => {
    // Configura el entorno de pruebas, declarando el componente a probar
    TestBed.configureTestingModule({
      declarations: [InicioSesionComponent]  // Declara el componente a probar
    });

    // Crea una fixture del componente, lo que permite acceder al DOM y manipularlo en las pruebas
    fixture = TestBed.createComponent(InicioSesionComponent);
    component = fixture.componentInstance;  // Asocia la fixture al componente
    fixture.detectChanges();  // Detecta los cambios en el DOM, actualizando la vista
  });

  // Prueba unitaria para verificar si el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy();  // Verifica que la instancia del componente no sea nula o indefinida
  });
});
