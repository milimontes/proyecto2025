import { Component } from '@angular/core';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css']
})
export class CarruselComponent {
  imagenes = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3G_DpMn1vIUWo6b5atlFXL9X_iixrCpvEzw&s',
    'https://via.placeholder.com/600x300?text=Imagen+2',
    'https://via.placeholder.com/600x300?text=Imagen+3',
  ];
  indiceActual = 0;

  siguiente() {
    this.indiceActual = (this.indiceActual + 1) % this.imagenes.length;
  }

  anterior() {
    this.indiceActual = (this.indiceActual - 1 + this.imagenes.length) % this.imagenes.length;
  }
}

