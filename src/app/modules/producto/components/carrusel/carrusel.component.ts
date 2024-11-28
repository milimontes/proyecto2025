// Importaciones necesarias para el componente
import { Component } from '@angular/core';
import Swal from 'sweetalert2';  // Librería para mostrar alertas de manera elegante
import { Producto } from 'src/app/models/producto';  // Importa la interfaz Producto para manejar los productos

@Component({
  selector: 'app-carrusel',  // Nombre del componente en el HTML
  templateUrl: './carrusel.component.html',  // Ruta al archivo de la plantilla (HTML)
  styleUrls: ['./carrusel.component.css']  // Ruta al archivo de estilos (CSS)
})
export class CarruselComponent {
  // Variable para almacenar un texto que describe el producto añadido al carrusel
  product: string = '';

  // Colección de productos que se muestran en el carrusel
  productosCarrusel: Producto[] = [];

  // Variables para controlar la visualización de diferentes tipos de contenido (como un filtro)
  juguete: boolean = false;
  general: boolean = true;

  // Arreglo de imágenes para el carrusel, que almacena las rutas de las imágenes
  images: string[] = [
    '',  // Este es un valor vacío que podrías utilizar si quieres incluir una imagen predeterminada
    'assets/carrusel/imagen2.jpg',  // Ruta de la segunda imagen del carrusel
    'assets/carrusel/imagen3.jpg'   // Ruta de la tercera imagen del carrusel
  ];

  // Función que se llama cuando un producto es añadido al carrusel
  productoAnadido(producto: Producto) {
    // Modifica el valor de 'product' para mostrar el nombre y precio del producto añadido
    this.product = `${producto.nombre} : $${producto.precio}`;

    try {
      // Intenta agregar el producto a la colección de productos del carrusel
      this.productosCarrusel.push(producto);

      // Muestra una alerta utilizando SweetAlert2 indicando que el producto fue añadido con éxito
      Swal.fire({
        title: 'Bien',  // Título de la alerta
        text: 'Ha añadido este producto con éxito',  // Texto descriptivo de la alerta
        icon: 'info'  // Icono que aparece en la alerta (información)
      });
    } catch (error) {
      // Si ocurre un error, muestra una alerta con el mensaje de error
      Swal.fire({
        title: '¡Oh no!',  // Título de la alerta de error
        text: 'Ha ocurrido un error\n' + error,  // Muestra el mensaje de error
        icon: 'error'  // Icono que aparece en la alerta (error)
      });
    }
  }
}
