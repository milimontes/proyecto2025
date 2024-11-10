import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CrudService } from '../../services/crud.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  // Crear colección de productos del tipo producto -> lo definimos como un array
  coleccionProductos: Producto[] = [];

  // Variable para manejar el estado de Edición y Eliminación de productos
  modalVisibleProducto: boolean = false;

  // Variable va a tomar el producto que nosotros elijamos
  productoSeleccionado!: Producto;

  nombreImagen!: string; // Obtendrá el nombre de la imagen

  imagen!: string; // Obtendrá la ruta de la imagen

  // Definimos formulario para los productos
  producto = new FormGroup({
    nombre: new FormControl('', Validators.required),
    precio: new FormControl(0, Validators.required),
    descripcion: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    alt: new FormControl('', Validators.required)
  });

  constructor(public servicioCrud: CrudService) { }

  ngOnInit(): void {
    // subscribe -> notifica constantemente los cambios actuales del sistema
    this.servicioCrud.obtenerProducto().subscribe(producto => {
      // guarda la información recibida como un nuevo "producto" a la colección
      this.coleccionProductos = producto;
    });
  }

  // Método para limpiar el formulario después de guardar
  limpiarFormulario(): void {
    this.producto.reset(); // Esto restablecerá todos los valores del formulario
  }

  async agregarProducto() {
    // Validamos los valores del producto agregado
    if (this.producto.valid) {
      let nuevoProducto: Producto = {
        idProducto: '', // idProducto no se toma porque es generado por la BD y no por el usuario
        nombre: this.producto.value.nombre!,
        descripcion: this.producto.value.descripcion!,
        precio: this.producto.value.precio!,
        categoria: this.producto.value.categoria!,
        imagen: '',
        alt: this.producto.value.alt!
      };

      // Enviamos nombre y url de la imagen; definimos carpeta de imágenes como "productos"
      await this.servicioCrud.subirImagen(this.nombreImagen, this.imagen, 'productos')
        .then(resp => {
          // Encapsulamos respuesta y enviamos la información obtenida
          this.servicioCrud.obtenerUrlImagen(resp)
            .then(url => {
              // Ahora método crearProducto recibe los datos del formulario y la URL formateada
              this.servicioCrud.crearProducto(nuevoProducto, url)
                .then(producto => {
                  alert('Ha agregado un nuevo producto con éxito :)');
                  // Limpiamos formulario para agregar nuevos productos
                  this.producto.reset();
                })
                .catch(error => {
                  alert('Hubo un problema al agregar un nuevo producto :(');
                  this.producto.reset();
                });
            });
        });
    }
  }

  // Función para alertar al usuario del producto que desea eliminar
  mostrarBorrar(productoSeleccionado: Producto) {
    // abre el modal
    this.modalVisibleProducto = true;
    // toma los valores del producto elegido
    this.productoSeleccionado = productoSeleccionado;
  }

  // Función para eliminar definitivamente al producto
  borrarProducto() {
    // Envía ID del producto eliminado y la ubicación en el almacenamiento de STORAGE
    this.servicioCrud.eliminarProducto(this.productoSeleccionado.idProducto, this.productoSeleccionado.imagen)
      .then(respuesta => {
        alert('El producto se ha eliminado correctamente.');
      })
      .catch(error => {
        alert('No se ha podido eliminar el producto \n' + error);
      });
  }

  // Función para seleccionar el producto a editar
  mostrarEditar(productoSeleccionado: Producto) {
    this.productoSeleccionado = productoSeleccionado;

    // Enviar o "setear" los nuevos valores y reasignarlos a las variables
    this.producto.setValue({
      nombre: productoSeleccionado.nombre,
      precio: productoSeleccionado.precio,
      descripcion: productoSeleccionado.descripcion,
      categoria: productoSeleccionado.categoria,
      alt: productoSeleccionado.alt
    });
  }

  editarProducto() {
    let datos: Producto = {
      idProducto: this.productoSeleccionado.idProducto,
      nombre: this.producto.value.nombre!,
      precio: this.producto.value.precio!,
      descripcion: this.producto.value.descripcion!,
      categoria: this.producto.value.categoria!,
      imagen: this.productoSeleccionado.imagen,
      alt: this.producto.value.alt!
    };

    // Verificamos que el usuario ingrese una nueva imagen o no
    if (this.imagen) {
      this.servicioCrud.subirImagen(this.nombreImagen, this.imagen, 'productos')
        .then(resp => {
          this.servicioCrud.obtenerUrlImagen(resp)
            .then(url => {
              // Actualizamos URL de la imagen en los datos del formulario
              datos.imagen = url;

              // Actualizamos los datos desde el formulario de edición
              this.actualizarProducto(datos);

              // Vaciamos casillas del formulario
              this.producto.reset();
            })
            .catch(error => {
              alert('Hubo un problema al subir la imagen :( \n' + error);
              this.producto.reset();
            });
        });
    } else {
      // Si no hay nueva imagen, solo actualizamos el producto sin modificar la imagen
      this.actualizarProducto(datos);
    }
  }

  // ACTUALIZA la información ya existente de los productos
  actualizarProducto(datos: Producto) {
    this.servicioCrud.modificarProducto(this.productoSeleccionado.idProducto, datos)
      .then(producto => {
        alert('El producto fue modificado con éxito.');
      })
      .catch(error => {
        alert('Hubo un problema al modificar el producto.');
      });
  }

  // Método para CARGAR IMÁGENES
  cargarImagen(event: any) {
    let archivo = event.target.files[0];
    let reader = new FileReader();

    if (archivo != undefined) {
      reader.readAsDataURL(archivo);
      reader.onloadend = () => {
        let url = reader.result;

        if (url != null) {
          this.nombreImagen = archivo.name;
          this.imagen = url.toString();
        }
      };
    }
  }
}
