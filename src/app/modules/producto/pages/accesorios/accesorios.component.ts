import { Component } from '@angular/core';

// Interfaz para representar cada producto en la tienda
interface Producto {
  id: number;              // ID único del producto
  nombre: string;          // Nombre del producto
  precio: number;          // Precio del producto
  imagenUrl: string;       // URL de la imagen del producto
  liked: boolean;          // Estado del "me gusta" para cada producto
}

// Interfaz para representar un elemento en el carrito
interface CarritoItem {
  producto: Producto;      // Producto que está en el carrito
  cantidad: number;        // Cantidad de ese producto en el carrito
}

// Interfaz para representar la información del pago
interface Pago {
  nombre: string;
  numeroTarjeta: string;
  fechaExpiracion: string;
  cvv: string;
}

@Component({
  selector: 'app-accesorios',           // Selector utilizado en el HTML para este componente
  templateUrl: './accesorios.component.html', // Archivo HTML asociado al componente
  styleUrls: ['./accesorios.component.css']   // Archivo de estilos CSS asociado al componente
})
export class AccesoriosComponent {
  // Lista de productos disponibles en la tienda de accesorios
  productos: Producto[] = [
    { id: 1, nombre: 'CARTERITA PRACTICA', precio: 30000, imagenUrl: 'https://static.zara.net/assets/public/952c/8e73/141442dd844f/16201025218c/13514220800-e1/13514220800-e1.jpg?ts=1726759626402&w=563', liked: false },
    { id: 2, nombre: 'COLLAR', precio: 15000, imagenUrl: 'https://www.chanel.com/images/f_auto,w_512,h_512/etoile-filante-necklace-diamond-white-gold-packshot-default-j10813-9553428250654.jpg', liked: false },
    { id: 3, nombre: 'BLAZALETE', precio: 25000, imagenUrl: 'https://www.chanel.com/images/f_auto,w_512,h_512/comete-chevron-bracelet-white-white-gold-diamond-packshot-default-j11491-8834196078622.jpg', liked: false },
    { id: 4, nombre: 'CINTURÓN DE CUERO', precio: 8000, imagenUrl: 'https://static.zara.net/assets/public/2ae9/5904/438c4716b127/0371dbf918dd/02823300800-e1/02823300800-e1.jpg?ts=1725271008678&w=563', liked: false },
    { id: 5, nombre: 'MONEDERO', precio: 20000, imagenUrl: 'https://static.zara.net/assets/public/c357/ddb8/f1994eeeafb0/7eb0642938b0/13808420800-e1/13808420800-e1.jpg?ts=1724154453942&w=563', liked: false },
    { id: 6, nombre: 'RELOJ', precio: 65000, imagenUrl: 'https://www.chanel.com/images//t_one///q_auto:good,f_autoplus,fl_lossy,dpr_1.1/w_620/premiere-edition-originale-watch-yellow-black-calfskin-gold-coating-packshot-default-h6951-9530399621150.jpg', liked: false },
    { id: 7, nombre: 'BANDOLERA', precio: 12000, imagenUrl: 'https://static.zara.net/assets/public/af16/0b83/1c9b464da0a3/514569cff123/13536320804-e1/13536320804-e1.jpg?ts=1724251050853&w=563', liked: false },
    { id: 8, nombre: 'GAFAS DE SOL', precio: 50000, imagenUrl: 'https://www.chanel.com/images/t_fashionzoom1/f_auto/rectangle-sunglasses-black-acetate-metal-acetate-metal-packshot-default-a71662x09961s2218-9549078102046.jpg', liked: false },
    { id: 9, nombre: 'BROCHE DE PELO', precio: 45000, imagenUrl: 'https://www.chanel.com/images/t_one////q_auto:good,f_auto,fl_lossy,dpr_1.1/w_480//ruban-brooch-white-white-gold-diamond-packshot-default-j60878-9553413046302.jpg', liked: false },
    { id: 10, nombre: 'ANILLO COCO CRUSH', precio: 35000, imagenUrl: 'https://www.chanel.com/images/t_one////q_auto:good,f_auto,fl_lossy,dpr_1.1/w_480//coco-crush-ring-white-white-gold-diamond-packshot-default-j12869-9557125988382.jpg', liked: false }
  ];

  // Carrito de compras
  carrito: CarritoItem[] = [];

  // Datos de pago
  pago: Pago = { nombre: '', numeroTarjeta: '', fechaExpiracion: '', cvv: '' };
  mostrarPago = false;  // Controla la visibilidad del modal de pago
  pagoRealizado = false; // Indica si el pago fue realizado

  imagenGrandeUrl: string | null = null;  // URL de la imagen en tamaño grande

  // Función para agregar un producto al carrito
  agregarAlCarrito(producto: Producto): void {
    const itemEnCarrito = this.carrito.find(item => item.producto.id === producto.id);
    if (itemEnCarrito) {
      itemEnCarrito.cantidad += 1;  // Incrementa la cantidad si el producto ya está en el carrito
    } else {
      this.carrito.push({ producto, cantidad: 1 });  // Añade el producto al carrito
    }
  }

  // Funciones para aumentar o reducir la cantidad de productos en el carrito
  incrementarCantidad(item: CarritoItem): void {
    item.cantidad++;  // Aumenta la cantidad
  }

  reducirCantidad(item: CarritoItem): void {
    item.cantidad--;  // Reduce la cantidad
    if (item.cantidad === 0) {
      this.eliminarDelCarrito(item.producto);  // Elimina el producto si la cantidad es 0
    }
  }

  // Función para eliminar un producto del carrito
  eliminarDelCarrito(producto: Producto): void {
    this.carrito = this.carrito.filter(item => item.producto.id !== producto.id);
  }

  // Función para calcular el total del carrito
  calcularTotal(): number {
    return this.carrito.reduce((total, item) => total + item.producto.precio * item.cantidad, 0);
  }

  // Función para ver una imagen en grande
  verImagenGrande(imagenUrl: string): void {
    this.imagenGrandeUrl = imagenUrl;  // Asigna la URL al modal
  }

  // Función para cerrar el modal de la imagen
  cerrarModal(): void {
    this.imagenGrandeUrl = null;  // Cierra el modal al limpiar la URL
  }

  // Función para mostrar el modal de pago
  procesarPago(): void {
    this.mostrarPago = true;  // Muestra el modal de pago
  }

  // Función para finalizar el pago
  finalizarPago(formPago: any): void {
    if (formPago.valid) {
      this.pagoRealizado = true;  // Marca el pago como realizado
      this.carrito = [];  // Limpia el carrito
      this.mostrarPago = false;  // Cierra el modal de pago
    } else {
      alert('Por favor, completa todos los campos correctamente.');  // Muestra un mensaje de error si no es válido
    }
  }

  // Función para cerrar el modal de pago
  cerrarPago(): void {
    this.mostrarPago = false;  // Cierra el modal de pago sin procesar el pago
  }

  // Función para alternar el estado de "Me gusta" de un producto
  toggleLike(producto: Producto): void {
    producto.liked = !producto.liked;  // Cambia el estado de "me gusta"
  }
}
