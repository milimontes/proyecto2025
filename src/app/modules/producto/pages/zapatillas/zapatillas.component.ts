import { Component } from '@angular/core';

// Interfaz para representar cada producto en la tienda
interface Producto {
  id: number;         // Identificador único para cada producto
  nombre: string;     // Nombre descriptivo del producto
  precio: number;     // Precio del producto en la moneda local
  imagenUrl: string;  // URL de la imagen del producto
  liked: boolean;     // Estado del "Me gusta", si el usuario lo marca como favorito
}

// Interfaz para representar un elemento en el carrito
interface CarritoItem {
  producto: Producto; // Producto en el carrito
  cantidad: number;   // Cantidad de este producto en el carrito
}

@Component({
  selector: 'app-zapatillas', // Selector de este componente
  templateUrl: './zapatillas.component.html', // Ruta al archivo de plantilla HTML
  styleUrls: ['./zapatillas.component.css'], // Ruta al archivo de estilo CSS
})
export class ZapatillasComponent {
  // Array de productos disponibles en la tienda
  productos: Producto[] = [
    { 
      id: 1, 
      nombre: 'ZAPATILLA CUERDAS MULTIPIEZAS', 
      precio: 89990, 
      imagenUrl: 'https://static.zara.net/assets/public/d001/c39a/8d604cedbd49/0108a92b56f9/12229320203-e1/12229320203-e1.jpg?ts=1723105621552&w=563', 
      liked: false 
    },
    { 
      id: 2, 
      nombre: 'ZAPATILLA MULTIPIEZAS', 
      precio: 129990, 
      imagenUrl: 'https://static.zara.net/assets/public/8c7a/9fe4/96e14b2c9385/f8610a2d1094/12927320500-e1/12927320500-e1.jpg?ts=1723116332146&w=563', 
      liked: false 
    },
    { 
      id: 3, 
      nombre: 'ZAPATILLA NORMAL', 
      precio: 65000, 
      imagenUrl: 'https://static.zara.net/assets/public/935f/9f4d/c9da437ab412/45d5a86e083c/12911420800-e1/12911420800-e1.jpg?ts=1723116330273&w=563', 
      liked: false 
    },
    { 
      id: 4, 
      nombre: 'ZAPATILLA NORMAL', 
      precio: 79990, 
      imagenUrl: 'https://static.zara.net/assets/public/7a7b/9dc8/f73e43d189d2/56b655af20f4/12927320001-e1/12927320001-e1.jpg?ts=1723116330982&w=563', 
      liked: false 
    },
    { 
      id: 5, 
      nombre: 'RUNNING CREMALLERA', 
      precio: 59990, 
      imagenUrl: 'https://static.zara.net/assets/public/0454/ffae/4fe84d169b29/baad5e960e4c/12319220800-e1/12319220800-e1.jpg?ts=1724407577514&w=563', 
      liked: false 
    }
  ];

  // Array para almacenar los productos en el carrito
  carrito: CarritoItem[] = [];
  imagenGrandeUrl: string | null = null; // URL de la imagen en grande que se muestra en el modal
  mostrarPago = false;  // Controla la visibilidad del modal de pago
  pagoRealizado = false;  // Indica si el pago fue procesado correctamente
  pago: any = { nombre: '', numeroTarjeta: '', fechaExpiracion: '', cvv: '' }; // Datos del formulario de pago

  // Función para agregar un producto al carrito
  agregarAlCarrito(producto: Producto): void {
    const itemEnCarrito = this.carrito.find(item => item.producto.id === producto.id);
    if (itemEnCarrito) {
      itemEnCarrito.cantidad += 1; // Si el producto ya está en el carrito, incrementa su cantidad
    } else {
      this.carrito.push({ producto, cantidad: 1 }); // Si no está, lo agrega con cantidad 1
    }
  }

  // Función para eliminar un producto del carrito
  eliminarDelCarrito(producto: Producto): void {
    this.carrito = this.carrito.filter(item => item.producto.id !== producto.id); // Elimina el producto del carrito
  }

  // Función para calcular el total del carrito
  calcularTotal(): number {
    return this.carrito.reduce((total, item) => total + item.producto.precio * item.cantidad, 0); // Suma el precio total de todos los productos en el carrito
  }

  // Función para ver la imagen en grande
  verImagenGrande(imagenUrl: string): void {
    this.imagenGrandeUrl = imagenUrl; // Asigna la URL de la imagen al modal
  }

  // Función para cerrar el modal de imagen
  cerrarModal(): void {
    this.imagenGrandeUrl = null; // Resetea la URL de la imagen
  }

  // Función para mostrar el formulario de pago
  procesarPago(): void {
    this.mostrarPago = true; // Hace visible el modal de pago
  }

  // Función para finalizar el pago
  finalizarPago(formPago: any): void {
    if (formPago.valid) {
      this.pagoRealizado = true; // Marca el pago como realizado
      this.carrito = [];  // Vacía el carrito
      this.mostrarPago = false;  // Cierra el modal de pago
    } else {
      alert('Por favor, completa todos los campos correctamente.'); // Muestra alerta si el formulario no está completo
    }
  }

  // Función para cerrar el modal de pago
  cerrarPago(): void {
    this.mostrarPago = false; // Hace invisible el modal de pago
  }

  // Función para alternar el estado de "Me gusta" en un producto
  toggleLike(producto: Producto): void {
    producto.liked = !producto.liked; // Cambia el estado de "liked"
  }

  // Función para incrementar la cantidad de un producto en el carrito
  incrementarCantidad(item: CarritoItem): void {
    item.cantidad += 1; // Aumenta la cantidad del producto en el carrito
  }

  // Función para reducir la cantidad de un producto en el carrito
  reducirCantidad(item: CarritoItem): void {
    if (item.cantidad > 1) {
      item.cantidad -= 1; // Disminuye la cantidad solo si es mayor a 1
    }
  }
}
