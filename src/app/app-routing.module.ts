import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './modules/inicio/pages/inicio/inicio.component';
import { ContactoComponent } from './modules/contacto/contacto.component';


// Son las encargadas de tener todas las rutas de la página
const routes: Routes = [
  // Ruta común -> 1 solo componente
  {
    path:"",component:InicioComponent
  },
  { path: 'contacto', component: ContactoComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' }, // Ruta predeterminada, cambia según tu proyecto
  // Carga perezosa -> 1 módulo  carga perezosa 
  //Optimiza la carga de recursos al cargar módulos solo cuando se necesitan.
  // loadChildren: indica una ruta hija
  // ()=>import: ruta de dónde viene el módulo
  // .then: promesa/ función asincronica
  {
    path:"",loadChildren:()=>import('./modules/inicio/inicio.module').then(m=>m.InicioModule)
  },
  //InicioComponent y ContactoComponent son componentes individuales a los que el usuario puede navegar.
  //loadChildren: Especifica qué módulo cargar.
  //then: Resuelve la promesa y carga el módulo especificado (InicioModule).
  {
    path:"",loadChildren:()=>import('./modules/producto/producto.module').then(m=>m.ProductoModule)
  },
  {
    path:"",loadChildren:()=>import('./modules/autentificacion/autentificacion.module').then(m=>m.AutentificacionModule)
  },
  {
    path:"",loadChildren:()=>import('./modules/admin/admin.module').then(m=>m.AdminModule)
  }
];

//Importaciones NgModule:Permite declarar el módulo de rutas.
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  //RouterModule y Routes:Proporcionan las herramientas para configurar el sistema de rutas.
  //El AppRoutingModule organiza y gestiona las rutas de la aplicación, permitiendo que los usuarios naveguen entre diferentes vistas (componentes o módulos).


})
export class AppRoutingModule { }
