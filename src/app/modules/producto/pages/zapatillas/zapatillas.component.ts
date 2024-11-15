import { Component } from '@angular/core';
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
@Component({
  selector: 'app-zapatillas',           // Selector utilizado en el HTML para este componente
  templateUrl: './zapatillas.component.html', // Archivo HTML asociado al componente
  styleUrls: ['./zapatillas.component.css']   // Archivo de estilos CSS asociado al componente
})
export class ZapatillasComponent {
  // Array que contiene todos los productos disponibles en la tienda (ahora zapatillas)
  productos: Producto[] = [
    { id: 1, nombre: 'ZAPATILLA CUERDAS MULTIPIEZAS', precio: 89990, imagenUrl: 'https://static.zara.net/assets/public/d001/c39a/8d604cedbd49/0108a92b56f9/12229320203-e1/12229320203-e1.jpg?ts=1723105621552&w=563', liked: false },
    { id: 2, nombre: 'ZAPATILLA MULTIPIEZAS', precio: 129990, imagenUrl: 'https://static.zara.net/assets/public/8c7a/9fe4/96e14b2c9385/f8610a2d1094/12927320500-e1/12927320500-e1.jpg?ts=1723116332146&w=563', liked: false },
    { id: 3, nombre: 'ZAPATILLA NORMAL', precio: 65000, imagenUrl: 'https://static.zara.net/assets/public/935f/9f4d/c9da437ab412/45d5a86e083c/12911420800-e1/12911420800-e1.jpg?ts=1723116330273&w=563', liked: false },
    { id: 4, nombre: 'zAPATILLA NORMAL', precio: 79990, imagenUrl: 'https://static.zara.net/assets/public/7a7b/9dc8/f73e43d189d2/56b655af20f4/12927320001-e1/12927320001-e1.jpg?ts=1723116330982&w=563', liked: false },
    { id: 5, nombre: 'RUNNING CREMALLERA', precio: 59990, imagenUrl: 'https://static.zara.net/assets/public/0454/ffae/4fe84d169b29/baad5e960e4c/12319220800-e1/12319220800-e1.jpg?ts=1724407577514&w=563', liked: false }
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
