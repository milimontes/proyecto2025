import { Component } from '@angular/core';
// IMPORTAMOS INTERFAZ
import { Animal } from 'src/app/models/animal';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  // PROPIEDAD PÚBLICA (TIPO ARRAY)
  public info: Animal[];

  constructor(){
    this.info = [
      {
        id: "",
        nombre: "outfits",
        edad: 0,
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxJ532BCOj83JBRPNebSmVXw---v6tmq9sycCqN1CTtSZvW2rcXc_wfsU95DzIAAuSqSI&usqp=CAU",
        alt: "Un outfit de mujer"
      },
      {
        id: "",
        nombre: "outfits",
        edad: 7,
        imagen: "https://i.pinimg.com/236x/e6/69/62/e66962f988920bfa4d0cad1afeabfb75.jpg",
        alt: "outfit de hombre"
      },
      {
        id: "",
        nombre: "cartera",
        edad: 10,
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQebeNGTMzZfmJyMM1Io5kZDD_3ESCS7oVgiAT9SAU5FygnkVkSHCo9bLUEjWn81kCEQw&usqp=CAU",
        alt: "accesorio cartera"
      }
    ]
  }
}
