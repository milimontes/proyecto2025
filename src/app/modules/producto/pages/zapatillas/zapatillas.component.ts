import { Component } from '@angular/core';

@Component({
  selector: 'app-zapatillas',           // Selector utilizado en el HTML para este componente
  templateUrl: './zapatillas.component.html', // Archivo HTML asociado al componente
  styleUrls: ['./zapatillas.component.css']   // Archivo de estilos CSS asociado al componente
})
export class ZapatillasComponent {
  // Interfaz para representar cada producto en la tienda
interface Producto {
  id: number;              // ID único del producto
  nombre: string;          // Nombre del producto
  precio: number;          // Precio del producto
  imagenUrl: string;       // URL de la imagen del producto
  liked: boolean;          // Indica si el producto ha sido marcado con "me gusta"
}

// Interfaz para representar un elemento en el carrito
interface CarritoItem {
  producto: Producto;      // Producto que está en el carrito
  cantidad: number;        // Cantidad de ese producto en el carrito
}
  
  // Array que contiene todos los productos disponibles en la tienda (ahora zapatillas)
  productos: Producto[] = [
    { id: 1, nombre: 'Zapatillas Nike Air Max', precio: 89990, imagenUrl: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/f_96b594a8-08d7-4f02-9577-71297a9270ab/air-max-90-shoes-gxNhkz.jpg', liked: false },
    { id: 2, nombre: 'Adidas Ultraboost 22', precio: 129990, imagenUrl: 'https://www.adidas.co.uk/media/asset_content/11/ea/11ea400eac9e/zoom/ultraboost-22-womens-shoes.jpg', liked: false },
    { id: 3, nombre: 'Puma Suede Classic', precio: 65000, imagenUrl: 'https://static.puma.com/w_480,h_480,c_fit,f_auto,q_auto,w_1000/ultra_2.jpg', liked: false },
    { id: 4, nombre: 'Reebok Classic Leather', precio: 79990, imagenUrl: 'https://www.reebok.com/dw/image/v2/BDY2_PRD/on/demandware.static/-/Sites-reebok-uk-Library/default/dw9084bfc8/REEBOK_Classic_Leather.jpg', liked: false },
    { id: 5, nombre: 'New Balance 574', precio: 59990, imagenUrl: 'https://www.newbalance.com.co/media/catalog/product/cache/17fd6be6825efac4bba01d7cfcf7d961/5/7/574v2bbr_w.jpg', liked: false }
  ];

  // Array que representa los productos añadidos al carrito de compras
  carrito: CarritoItem[] = [];

  // Propiedad para almacenar la URL de la imagen cuando se muestra en tamaño grande (modal)
  imagenGrandeUrl: string | null = null;

  // Función para marcar/desmarcar "me gusta"
  toggleLike(producto: Producto): void {
    producto.liked = !producto.liked;
  }

  // Función para agregar productos al carrito
  agregarAlCarrito(producto: Producto): void {
    const itemEnCarrito = this.carrito.find(item => item.producto.id === producto.id);
    if (itemEnCarrito) {
      itemEnCarrito.cantidad += 1;
    } else {
      this.carrito.push({ producto, cantidad: 1 });
    }
  }

  // Función para eliminar productos del carrito
  eliminarDelCarrito(producto: Producto): void {
    this.carrito = this.carrito.filter(item => item.producto.id !== producto.id);
  }

  // Función para calcular el total del carrito
  calcularTotal(): number {
    return this.carrito.reduce((total, item) => total + item.producto.precio * item.cantidad, 0);
  }

  // Función para ver la imagen en grande
  verImagenGrande(imagenUrl: string): void {
    this.imagenGrandeUrl = imagenUrl;
  }

  // Función para cerrar el modal de imagen
  cerrarModal(): void {
    this.imagenGrandeUrl = null;
  }
}
