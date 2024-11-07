import { Component } from '@angular/core';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagenUrl: string;
  liked: boolean;
}

interface CarritoItem {
  producto: Producto;
  cantidad: number;
}

@Component({
  selector: 'app-indumentaria',
  templateUrl: './indumentaria.component.html',
  styleUrls: ['./indumentaria.component.css']
})
export class IndumentariaComponent {
  productos: Producto[] = [
    { id: 1, nombre: 'CHALECO SASTRE CON LINO', precio: 89.990, imagenUrl: 'https://static.zara.net/assets/public/5458/7d75/f2e840aab447/e67cc835f434/09929521505-e1/09929521505-e1.jpg?ts=1712135169646&w=563', liked: false },
    { id: 2, nombre: 'POLLERA DENIM', precio: 30.000, imagenUrl: 'https://static.zara.net/assets/public/81c1/2542/eb8a48498463/85c034143100/08290007401-e1/08290007401-e1.jpg?ts=1729590495552&w=563', liked: false },
    { id: 3, nombre: 'CROP TOP', precio: 15.000, imagenUrl: 'https://static.zara.net/assets/public/b7fc/6d1d/a2f249f79f0e/47550fc9bde0/03253324803-e1/03253324803-e1.jpg?ts=1706801084322&w=563', liked: false },
    { id: 4, nombre: 'JEANS TRF WIDE LEG ROTOS TIRO MEDIO', precio: 15.000, imagenUrl: 'https://static.zara.net/assets/public/a1fa/c631/b2dd42ae8d39/e49d6a5c4497/06688334400-e1/06688334400-e1.jpg?ts=1721806786750&w=563', liked: false },
    { id: 5, nombre: 'BODY ENTALLADO POLIAMIDA', precio: 42.000, imagenUrl: 'https://static.zara.net/assets/public/5b4a/9725/3406417eb5cc/ba10d7c1d529/03641349800-e1/03641349800-e1.jpg?ts=1724084585104&w=563', liked: false },
    { id: 6, nombre: 'CAMISETA PARCHE FOTOGRÁFIC', precio: 23.889, imagenUrl: 'https://static.zara.net/assets/public/8886/0c13/02f3495d8d33/ea3d6f7355b1/03992354933-e1/03992354933-e1.jpg?ts=1723533237629&w=563', liked: false },
    { id: 7, nombre: 'BUZO ESTAMPADO', precio: 70.000, imagenUrl: 'https://static.zara.net/assets/public/7cb8/ace0/00b141ecb925/cef510f49d02/05857446500-e1/05857446500-e1.jpg?ts=1724757065505&w=563', liked: false },
    { id: 8, nombre: 'BERMUDA', precio: 43.000, imagenUrl: 'https://static.zara.net/assets/public/ef51/24ac/41cb411196fc/e070daf0d689/08062408406-e1/08062408406-e1.jpg?ts=1719386691191&w=563', liked: false },







];

  carrito: CarritoItem[] = []; // Carrito de compras

  toggleLike(producto: Producto): void {
    producto.liked = !producto.liked;
  }

  // Agregar producto al carrito
  agregarAlCarrito(producto: Producto): void {
    const itemEnCarrito = this.carrito.find(item => item.producto.id === producto.id);
    if (itemEnCarrito) {
      itemEnCarrito.cantidad += 1; // Incrementar cantidad si ya está en el carrito
    } else {
      this.carrito.push({ producto, cantidad: 1 }); // Si no está en el carrito, agregarlo
    }
  }

  // Eliminar producto del carrito
  eliminarDelCarrito(producto: Producto): void {
    this.carrito = this.carrito.filter(item => item.producto.id !== producto.id);
  }

  // Calcular total del carrito
  calcularTotal(): number {
    return this.carrito.reduce((total, item) => total + item.producto.precio * item.cantidad, 0);
  }
}
