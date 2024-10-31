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

  // Arreglo de imágenes para el carrusel
  images: string[] = [
    'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/c9517fcf1709414fb57b3139c4dd3c90_9366/Pantalon_Deportivo_Essentials_Felpa_Francesa_Negro_IW0952_21_model.jpg',
    'assets/carrusel/imagen2.jpg',
    'assets/carrusel/imagen3.jpg'
  ];

  productoAnadido(producto: Producto) {
    // Modificador del valor de 'product'
    this.product = `${producto.nombre} : $${producto.precio}`;

    try {
      // Agregamos la información por el 
      // parámetro de la función a la colección de carrusel
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
