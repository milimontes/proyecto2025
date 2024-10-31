import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css']
})
export class CarruselComponent {
  // String que modificará el valor de @Input en el componente hijo
  product: string = '';

  // Colección de productos añadidos a la lista
  productosCarrusel: Producto[] = [];

  
  juguete: boolean = false;
  general: boolean = true;

  productoAnadido(producto: Producto) {
    // Modificador del valor de 'product'
    this.product = `${producto.nombre} : $${producto.precio}`;

    try {
      // Agregamos la información a la colección de carrusel
      this.productosCarrusel.push(producto);

      Swal.fire({
        title: 'Bien',
        text: 'Ha añadido este producto con éxito',
        icon: 'info'
      });
    } catch (error) {
      Swal.fire({
        title: '¡Oh no!',
        text: 'Ha ocurrido un error\n' + error,
        icon: 'error'
      });
    }
  }
}
