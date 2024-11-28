import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// IMPORTACIONES DE LAS VISTAS DEL MÓDULO PRODUCTO
import { ProductoComponent } from './pages/producto/producto.component';
import { IndumentariaComponent } from './pages/indumentaria/indumentaria.component';
import { AccesoriosComponent } from './pages/accesorios/accesorios.component';
import { ZapatillasComponent } from './pages/zapatillas/zapatillas.component';

// Definición de las rutas para los diferentes componentes
const routes: Routes = [
  {
    path: "producto", component: ProductoComponent  // Ruta para la vista del producto
  },
  {
    path: "indumentaria", component: IndumentariaComponent  // Ruta para la vista de indumentaria
  },
  {
    path: "accesorios", component: AccesoriosComponent  // Ruta para la vista de accesorios
  },
  {
    path: "zapatillas", component: ZapatillasComponent  // Ruta para la vista de zapatillas
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],  // Configura el RouterModule para las rutas definidas
  exports: [RouterModule]  // Exporta el RouterModule para ser utilizado en otros módulos
})
export class ProductoRoutingModule { }
