import { Component } from '@angular/core';

// Interfaz para representar cada producto en la tienda
interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagenUrl: string;
  liked: boolean; // Estado del "like" para cada producto
}

// Interfaz para representar un elemento en el carrito de compras
interface CarritoItem {
  producto: Producto; // Producto dentro del carrito
  cantidad: number; // Cantidad de ese producto en el carrito
}

// Interfaz para representar la información del pago
interface Pago {
  nombre: string;
  numeroTarjeta: string;
  fechaExpiracion: string;
  cvv: string;
}

@Component({
  selector: 'app-indumentaria',
  templateUrl: './indumentaria.component.html', // Enlace a la plantilla HTML
  styleUrls: ['./indumentaria.component.css'],  // Enlace a la hoja de estilos CSS
})
export class IndumentariaComponent {
  // Lista de productos disponibles en la tienda
  productos: Producto[] = [
    { id: 1, nombre: 'CHALECO SASTRE CON LINO', precio: 89990, imagenUrl: 'https://static.zara.net/assets/public/5458/7d75/f2e840aab447/e67cc835f434/09929521505-e1/09929521505-e1.jpg', liked: false },
    { id: 2, nombre: 'POLLERA DENIM', precio: 30000, imagenUrl: 'https://static.zara.net/assets/public/81c1/2542/eb8a48498463/85c034143100/08290007401-e1/08290007401-e1.jpg', liked: false },
    { id: 3, nombre: 'CROP TOP', precio: 15000, imagenUrl: 'https://static.zara.net/assets/public/b7fc/6d1d/a2f249f79f0e/47550fc9bde0/03253324803-e1/03253324803-e1.jpg', liked: false },
    { id: 4, nombre: 'SHORTS', precio: 15000, imagenUrl: 'https://static.zara.net/assets/public/ab91/22bb/4e0d4d2ea84c/36fae9d6ac53/03660801400-e1/03660801400-e1.jpg', liked: false },
    { id: 5, nombre: 'BODY ENTALLADO POLIAMIDA', precio: 42000, imagenUrl: 'https://static.zara.net/assets/public/5b4a/9725/3406417eb5cc/ba10d7c1d529/03641349800-e1/03641349800-e1.jpg', liked: false },
    { id: 6, nombre: 'CAMISETA PARCHE FOTOGRÁFICO', precio: 23889, imagenUrl: 'https://static.zara.net/assets/public/8886/0c13/02f3495d8d33/ea3d6f7355b1/03992354933-e1/03992354933-e1.jpg', liked: false },
    { id: 7, nombre: 'BUZO ESTAMPADO', precio: 70000, imagenUrl: 'https://static.zara.net/assets/public/7cb8/ace0/00b141ecb925/cef510f49d02/05857446500-e1/05857446500-e1.jpg', liked: false },
    { id: 8, nombre: 'BERMUDA', precio: 43000, imagenUrl: 'https://static.zara.net/assets/public/eeec/43a6/c8f6443491a4/ada1078fdf0a/01538499802-e1/01538499802-e1.jpg', liked: false },
    { id: 9, nombre: 'CHOMBA', precio: 35000, imagenUrl: 'https://static.zara.net/assets/public/5155/5ebc/d86d49988485/8b4b828d594a/01887460306-e1/01887460306-e1.jpg', liked: false },
    { id: 10, nombre: 'BERMUDA JOGGER', precio: 40000, imagenUrl: 'https://static.zara.net/assets/public/a4ad/1585/365f48a3b771/1f486241fb0a/03854410800-e1/03854410800-e1.jpg', liked: false }
  ];

  carrito: CarritoItem[] = [];  // Lista de productos añadidos al carrito
  imagenGrandeUrl: string | null = null; // URL de la imagen grande del producto
  mostrarPago = false;  // Variable que controla la visibilidad del modal de pago
  pagoRealizado = false; // Flag que indica si el pago ha sido realizado
  pago: Pago = { nombre: '', numeroTarjeta: '', fechaExpiracion: '', cvv: '' };  // Datos del pago

  // Función para agregar un producto al carrito
  agregarAlCarrito(producto: Producto): void {
    const itemEnCarrito = this.carrito.find(item => item.producto.id === producto.id);
    if (itemEnCarrito) {
      itemEnCarrito.cantidad += 1;  // Incrementa la cantidad si el producto ya está en el carrito
    } else {
      this.carrito.push({ producto, cantidad: 1 });  // Añade el producto al carrito con cantidad 1
    }
  }

  // Funciones para gestionar la cantidad de productos en el carrito
  incrementarCantidad(item: CarritoItem): void {
    item.cantidad++;  // Incrementa la cantidad del producto en el carrito
  }

  reducirCantidad(item: CarritoItem): void {
    item.cantidad--;  // Decrementa la cantidad del producto en el carrito
    if (item.cantidad === 0) {
      this.eliminarDelCarrito(item.producto);  // Elimina el producto si la cantidad llega a cero
    }
  }

  // Función para eliminar un producto del carrito
  eliminarDelCarrito(producto: Producto): void {
    this.carrito = this.carrito.filter(item => item.producto.id !== producto.id);  // Filtra los productos del carrito
  }

  // Función para calcular el total del carrito
  calcularTotal(): number {
    return this.carrito.reduce((total, item) => total + item.producto.precio * item.cantidad, 0);  // Suma el precio de todos los productos en el carrito
  }

  // Función para ver una imagen más grande de un producto
  verImagenGrande(imagenUrl: string): void {
    this.imagenGrandeUrl = imagenUrl;  // Asigna la URL de la imagen al modal
  }

  // Función para cerrar el modal de la imagen
  cerrarModal(): void {
    this.imagenGrandeUrl = null;  // Limpia la URL de la imagen para cerrar el modal
  }

  // Función para mostrar el modal de pago
  procesarPago(): void {
    this.mostrarPago = true;  // Muestra el modal de pago
  }

  // Función para finalizar el pago
  finalizarPago(formPago: any): void {
    if (formPago.valid) {
      this.pagoRealizado = true;  // Si el formulario es válido, marca el pago como realizado
      this.carrito = [];  // Limpia el carrito
      this.mostrarPago = false;  // Cierra el modal de pago
    } else {
      alert('Por favor, completa todos los campos correctamente.');  // Muestra un mensaje de error si el formulario no es válido
    }
  }

  // Función para cerrar el modal de pago
  cerrarPago(): void {
    this.mostrarPago = false;  // Cierra el modal de pago sin procesar el pago
  }

  // Función para alternar el estado de "Me gusta" de un producto
  toggleLike(producto: Producto): void {
    producto.liked = !producto.liked;  // Cambia el estado de liked entre verdadero y falso
  }
}
