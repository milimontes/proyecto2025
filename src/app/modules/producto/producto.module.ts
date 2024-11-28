import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
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
    // Componentes declarados que pertenecen a este módulo
    ProductoComponent,        // Vista para el producto
    IndumentariaComponent,    // Vista para la indumentaria
    CardComponent,            // Componente para mostrar productos en tarjetas
    CarruselComponent,        // Componente de carrusel para mostrar productos destacados
    AccesoriosComponent,      // Vista para los accesorios
    ZapatillasComponent,      // Vista para las zapatillas
  ],
  imports: [
    // Módulos importados que proporcionan funcionalidad adicional
    CommonModule,             // Módulo básico de Angular para funcionalidades comunes
    ProductoRoutingModule,    // Módulo de enrutamiento específico para el módulo de productos
    MatTabsModule,            // Módulo de Angular Material para usar pestañas
    FormsModule               // Módulo de Angular para trabajar con formularios
  ],
  exports: [
    // Componentes y módulos que se exportan para ser utilizados fuera de este módulo
    ProductoComponent,        // Exporta la vista Producto
    IndumentariaComponent,    // Exporta la vista Indumentaria
    AccesoriosComponent,      // Exporta la vista Accesorios
    ZapatillasComponent,      // Exporta la vista Zapatillas
    CardComponent,            // Exporta el componente Card
    MatTabsModule             // Exporta el módulo de pestañas de Angular Material
  ]
})
export class ProductoModule { }
