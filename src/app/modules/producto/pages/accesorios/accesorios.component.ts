// accesorios.component.ts
import { Component } from '@angular/core'; // Importamos el decorador Component desde Angular

@Component({
  selector: 'app-accesorios', // El selector que se usará para incluir el componente en HTML
  templateUrl: './accesorios.component.html', // La plantilla HTML que representa el componente
  styleUrls: ['./accesorios.component.css'] // Los estilos específicos para este componente
})
export class AccesoriosComponent {
  // Propiedad que almacena el título del accesorio
  title: string = 'Accesorio de Oficina';

  // Propiedad que almacena la descripción corta del accesorio
  description: string = 'Este es un accesorio útil para la oficina.';

  // Propiedad que almacena una descripción más detallada del accesorio
  detailedDescription: string = 'Este accesorio incluye varias características útiles, como organización y almacenamiento.';

  // Propiedad booleana que controla si la descripción detallada se muestra o no
  showDescription: boolean = false;

  // Método que alterna el valor de showDescription (muestra u oculta la descripción)
  toggleDescription(): void {
    this.showDescription = !this.showDescription;
  }
}
