import { Component } from '@angular/core';
// IMPORTAMOS INTERFAZ
import { Productos } from 'src/app/models/tarjetas';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  // PROPIEDAD PÚBLICA (TIPO ARRAY)
  public info: Productos[];
  constructor() {
    this.info = [
      {
        id: "",
        imagen: "https://static.zara.net/assets/public/3443/656e/ff2143c19102/3e90eb6c98e8/12341120800-e1/12341120800-e1.jpg?ts=1724407576624&w=563",
        nombre: "𝒛𝒂𝒑𝒂𝒕𝒊𝒍𝒍𝒂𝒔",
        alt: "Zapatillas",
        liked: false // propiedad para el "me gusta"
      },
      {
        id: "",
        nombre: "𝒄𝒂𝒓𝒕𝒆𝒓𝒂",
        imagen: "https://static.zara.net/assets/public/bbd1/9db9/6bf14cddb842/421a47dc7ee3/13600420800-e1/13600420800-e1.jpg?ts=1722425340717&w=563",
        alt: "Cartera",
        liked: false
      },
      {
        id: "",
        nombre: "𝒈𝒐𝒓𝒓𝒂",
        imagen: "https://static.zara.net/assets/public/a10e/9e9b/949741bca1cc/bdfa0f1db678/05875408400-e1/05875408400-e1.jpg?ts=1711009227920&w=563",
        alt: "Gorra",
        liked: false
      }
    ]
  }
  // Método para manejar el evento Like
  likeProducto(i: any) {
    i.liked = !i.liked; // Cambia el estado del "like"
  }
  // Método para manejar el evento Share
  shareProducto(i: any) {
    console.log('Compartir: ', i.nombre);
    // Aquí puedes agregar lógica para compartir el producto
  }
}
