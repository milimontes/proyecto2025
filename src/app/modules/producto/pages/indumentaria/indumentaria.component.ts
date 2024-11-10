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
  selector: 'app-indumentaria',           // Selector utilizado en el HTML para este componente
  templateUrl: './indumentaria.component.html', // Archivo HTML asociado al componente
  styleUrls: ['./indumentaria.component.css']   // Archivo de estilos CSS asociado al componente
})
export class IndumentariaComponent {
  // Array que contiene todos los productos disponibles en la tienda
  productos: Producto[] = [
    { id: 1, nombre: 'CHALECO SASTRE CON LINO', precio: 89990, imagenUrl: 'https://static.zara.net/assets/public/5458/7d75/f2e840aab447/e67cc835f434/09929521505-e1/09929521505-e1.jpg?ts=1712135169646&w=563', liked: false },
    { id: 2, nombre: 'POLLERA DENIM', precio: 30000, imagenUrl: 'https://static.zara.net/assets/public/81c1/2542/eb8a48498463/85c034143100/08290007401-e1/08290007401-e1.jpg?ts=1729590495552&w=563', liked: false },
    { id: 3, nombre: 'CROP TOP', precio: 15000, imagenUrl: 'https://static.zara.net/assets/public/b7fc/6d1d/a2f249f79f0e/47550fc9bde0/03253324803-e1/03253324803-e1.jpg?ts=1706801084322&w=563', liked: false },
    { id: 4, nombre: 'JEANS TRF WIDE LEG ROTOS TIRO MEDIO', precio: 15000, imagenUrl: 'https://static.zara.net/assets/public/a1fa/c631/b2dd42ae8d39/e49d6a5c4497/06688334400-e1/06688334400-e1.jpg?ts=1721806786750&w=563', liked: false },
    { id: 5, nombre: 'BODY ENTALLADO POLIAMIDA', precio: 42000, imagenUrl: 'https://static.zara.net/assets/public/5b4a/9725/3406417eb5cc/ba10d7c1d529/03641349800-e1/03641349800-e1.jpg?ts=1724084585104&w=563', liked: false },
    { id: 6, nombre: 'CAMISETA PARCHE FOTOGRÁFIC', precio: 23889, imagenUrl: 'https://static.zara.net/assets/public/8886/0c13/02f3495d8d33/ea3d6f7355b1/03992354933-e1/03992354933-e1.jpg?ts=1723533237629&w=563', liked: false },
    { id: 7, nombre: 'BUZO ESTAMPADO', precio: 70000, imagenUrl: 'https://static.zara.net/assets/public/7cb8/ace0/00b141ecb925/cef510f49d02/05857446500-e1/05857446500-e1.jpg?ts=1724757065505&w=563', liked: false },
    { id: 8, nombre: 'BERMUDA', precio: 43000, imagenUrl: 'https://static.zara.net/assets/public/eeec/43a6/c8f6443491a4/ada1078fdf0a/01538499802-e1/01538499802-e1.jpg?ts=1722423853478&w=563', liked: false },
    { id: 9, nombre: 'CHOMBA', precio: 35000, imagenUrl: 'https://static.zara.net/assets/public/5155/5ebc/d86d49988485/8b4b828d594a/01887460306-e1/01887460306-e1.jpg?ts=1725544206266&w=563', liked: false },
    { id: 10, nombre: 'BERMUDA JOGGER', precio: 40000, imagenUrl: 'https://static.zara.net/assets/public/a4ad/1585/365f48a3b771/1f486241fb0a/03854410800-e1/03854410800-e1.jpg?ts=1710950212297&w=563', liked: false }
  ];

  // Array que representa los productos añadidos al carrito de compras
  carrito: CarritoItem[] = [];

  // Propiedad para almacenar la URL de la imagen cuando se muestra en tamaño grande (modal)
  imagenGrandeUrl: string | null = null;

  /**
   * Marca o desmarca un producto como "me gusta".
   * @param producto Producto que se va a marcar o desmarcar
   */
  toggleLike(producto: Producto): void {
    producto.liked = !producto.liked; // Cambia el estado de 'liked' de true a false o viceversa
  }

  /**
   * Agrega un producto al carrito de compras. Si el producto ya existe en el carrito, incrementa la cantidad.
   * @param producto Producto que se va a agregar al carrito
   */
  agregarAlCarrito(producto: Producto): void {
    const itemEnCarrito = this.carrito.find(item => item.producto.id === producto.id);
    if (itemEnCarrito) {
      itemEnCarrito.cantidad += 1; // Incrementa la cantidad si ya está en el carrito
    } else {
      this.carrito.push({ producto, cantidad: 1 }); // Agrega el producto al carrito si no estaba antes
    }
  }

  /**
   * Elimina un producto del carrito de compras.
   * @param producto Producto que se va a eliminar del carrito
   */
  eliminarDelCarrito(producto: Producto): void {
    this.carrito = this.carrito.filter(item => item.producto.id !== producto.id);
  }

  /**
   * Calcula el costo total de los productos en el carrito.
   * @returns El total del carrito en número
   */
  calcularTotal(): number {
    return this.carrito.reduce((total, item) => total + item.producto.precio * item.cantidad, 0);
  }

  /**
   * Muestra la imagen en grande en un modal.
   * @param imagenUrl URL de la imagen que se va a mostrar en grande
   */
  verImagenGrande(imagenUrl: string): void {
    this.imagenGrandeUrl = imagenUrl; // Almacena la URL de la imagen en grande
  }

  /**
   * Cierra el modal de la imagen grande.
   */
  cerrarModal(): void {
    this.imagenGrandeUrl = null; // Borra la URL para cerrar el modal
  }
}
