import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from 'src/app/models/producto'; // Importa el modelo Producto desde el archivo 'producto.ts' en la carpeta 'models'
import { CrudService } from 'src/app/modules/admin/services/crud.service'; // Importa el servicio CrudService para realizar operaciones CRUD

@Component({
  selector: 'app-card', // Define el selector del componente, utilizado para incluir este componente en las plantillas
  templateUrl: './card.component.html', // Ruta al archivo HTML donde se define la estructura del componente
  styleUrls: ['./card.component.css'] // Ruta al archivo CSS donde se definen los estilos específicos de este componente
})
export class CardComponent {
  // Definición de las propiedades locales del componente

  coleccionProductos: Producto[] = []; // Define un array vacío para almacenar la colección de productos obtenidos

  productoSeleccionado!: Producto; // Variable para almacenar el producto seleccionado, inicializado como 'undefined'

  modalVisible: boolean = false; // Booleano que controla la visibilidad del modal, inicialmente es 'false'

  compraVisible: boolean = false; // Booleano que controla la visibilidad del mensaje "Última compra", inicialmente es 'false'

  // Decoradores de Angular para permitir la comunicación con el componente padre

  @Input() productoReciente: string = ''; // Propiedad de entrada que recibe el nombre del producto más reciente desde el componente padre

  @Output() productoAgregado = new EventEmitter<Producto>(); // Propiedad de salida para emitir el evento cuando un producto es agregado al carrito

  constructor(public servicioCrud: CrudService) {} // Inyección del servicio CrudService para obtener los productos

  ngOnInit(): void {
    // Método que se ejecuta al inicializar el componente

    this.servicioCrud.obtenerProducto().subscribe(producto => {
      this.coleccionProductos = producto; // Asigna la colección de productos obtenida desde el servicio a la propiedad 'coleccionProductos'
    });
  }

  // Método para mostrar un modal con la información del producto seleccionado

  mostrarVer(info: Producto) {
    this.modalVisible = true; // Cambia el estado de 'modalVisible' a true para mostrar el modal
    this.productoSeleccionado = info; // Asigna el producto seleccionado al 'productoSeleccionado'
  }

  // Método para agregar un producto al carrito y emitir el evento al componente padre

  agregarProducto(info: Producto) {
    this.productoAgregado.emit(info); // Emite el evento 'productoAgregado' con el producto como dato
    this.compraVisible = true; // Cambia el estado de 'compraVisible' a true para mostrar el mensaje "Última compra"
  }
}
