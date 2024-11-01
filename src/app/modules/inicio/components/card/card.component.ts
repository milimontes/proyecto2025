import { Component } from '@angular/core';
// IMPORTAMOS INTERFAZ
import { Productos} from 'src/app/models/tarjetas';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  // PROPIEDAD PÚBLICA (TIPO ARRAY)
  public info: Productos[];
  

  constructor(){
    this.info = [
      {
        id: "",
        imagen: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/5c01b6060b9647e8811daf630117bcaf_9366/Zapatilla_Campus_00s_Gris_HQ6507_01_standard.jpg",
        nombre: "𝒛𝒂𝒑𝒂𝒕𝒊𝒍𝒍𝒂𝒔",
        alt: "..."
      },
      {
        id: "",
        nombre: "𝒄𝒂𝒓𝒕𝒆𝒓𝒂",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn0eTdLOegoOtpL3tBV9s5HCLDmK0WlfJUmA5Ea-juGTdWdFksdMQNCsrtsO7aIGHq0TQ&usqp=CAU",
        alt: "..."
      },
      {
        id: "",
        nombre: "𝒈𝒐𝒓𝒓𝒂",
        imagen: "https://newera.com.ar/media/catalog/product/cache/06cfaa02c67cf3a5c3c05d775284c631/g/o/gorra-new-era-new-york-yankees-59fifty-citrus-pop-60288266_7_.jpg",
        alt: "..."
      }
    ]
  }
}
