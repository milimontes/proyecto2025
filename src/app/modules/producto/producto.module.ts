import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

// ARCHIVO DE RUTAS
import { ProductoRoutingModule } from './producto-routing.module';

// VISTAS
import { ProductoComponent } from './pages/producto/producto.component';
import { IndumentariaComponent } from './pages/indumentaria/indumentaria.component';
import { AccesoriosComponent } from './pages/accesorios/accesorios.component';
import { ZapatillasComponent } from './pages/zapatillas/zapatillas.component';


// COMPONENTES LOCALES
import { CardComponent } from './components/card/card.component';
import { CarruselComponent } from './components/carrusel/carrusel.component';


@NgModule({
  declarations: [
    ProductoComponent,
    IndumentariaComponent,
    CardComponent,
    CarruselComponent,
    AccesoriosComponent,
    ZapatillasComponent,

  ],
  imports: [
    CommonModule,
    ProductoRoutingModule,
    MatTabsModule
  ],
  exports: [
    ProductoComponent,
    IndumentariaComponent,
    AccesoriosComponent,
    ZapatillasComponent,

    CardComponent,
    MatTabsModule
  ]
})
export class ProductoModule { }
