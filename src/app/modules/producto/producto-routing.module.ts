import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// IMPORTACIONES DE LAS VISTAS DEL MÓDULO PRODUCTO
import { ProductoComponent } from './pages/producto/producto.component';
import { IndumentariaComponent } from './pages/indumentaria/indumentaria.component';
import { AccesoriosComponent } from './pages/accesorios/accesorios.component';
import { ZapatillasComponent } from './pages/zapatillas/zapatillas.component';


const routes: Routes = [
  {
    path:"producto",component:ProductoComponent
  },
{

  path:"indumentaria",component:IndumentariaComponent
},
{
  path:"accesorios",component:AccesoriosComponent
},

{
  path:"zapatillas",component:AccesoriosComponent
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
