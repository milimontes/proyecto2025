// accesorios.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing'; // Importa las herramientas de prueba de Angular
import { AccesoriosComponent } from './accesorios.component'; // Importa el componente que estamos probando

describe('AccesoriosComponent', () => {
  let component: AccesoriosComponent; // Variable para almacenar el componente
  let fixture: ComponentFixture<AccesoriosComponent>; // Variable para almacenar la referencia al fixture del componente

  // Configuración inicial antes de ejecutar las pruebas
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccesoriosComponent ] // Declaramos el componente que vamos a probar
    })
    .compileComponents(); // Compilamos los componentes
  });

  // Configuración del entorno de pruebas antes de cada prueba
  beforeEach(() => {
    fixture = TestBed.createComponent(AccesoriosComponent); // Crea una instancia del componente
    component = fixture.componentInstance; // Asocia la instancia del componente a la variable
    fixture.detectChanges(); // Detecta cambios para asegurarse de que el componente esté completamente cargado
  });

  // Prueba 1: Verificar que el componente se cree correctamente
  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que el componente haya sido creado
  });

  // Prueba 2: Verificar que el método toggleDescription() cambia el valor de showDescription
  it('should toggle showDescription when toggleDescription is called', () => {
    component.toggleDescription(); // Llama al método para mostrar la descripción
    expect(component.showDescription).toBeTrue(); // Verifica que showDescription sea verdadero

    component.toggleDescription(); // Llama al método nuevamente para ocultar la descripción
    expect(component.showDescription).toBeFalse(); // Verifica que showDescription sea falso
  });

  // Prueba 3: Verificar que el título y la descripción se muestren correctamente en el HTML
  it('should display title and description in HTML', () => {
    const compiled = fixture.nativeElement; // Obtiene el HTML del componente
    expect(compiled.querySelector('h3').textContent).toContain(component.title); // Verifica que el título se muestre correctamente
    expect(compiled.querySelector('p').textContent).toContain(component.description); // Verifica que la descripción se muestre correctamente
  });

  // Prueba 4: Verificar que el botón alterna la visibilidad de la descripción detallada
  it('should toggle description visibility when button is clicked', () => {
    const compiled = fixture.nativeElement; // Obtiene el HTML del componente
    const button = compiled.querySelector('button'); // Encuentra el botón

    // Simula un clic en el botón
    button.click();
    fixture.detectChanges(); // Detecta los cambios en el DOM
    expect(compiled.querySelector('div').textContent).toContain(component.detailedDescription); // Verifica que la descripción detallada sea visible

    // Simula otro clic en el botón
    button.click();
    fixture.detectChanges(); // Detecta los cambios en el DOM nuevamente
    expect(compiled.querySelector('div')).toBeNull(); // Verifica que la descripción detallada ya no esté visible
  });
});
