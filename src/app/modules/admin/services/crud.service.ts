import { Injectable } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { getDownloadURL, getStorage, ref, UploadResult, uploadString, deleteObject } from 'firebase/storage';

/*
  getDownloadURL -> Para obtener la URL de descarga de una imagen subida.
  getStorage -> Para obtener la instancia de almacenamiento en Firebase.
  ref -> Para crear referencias a ubicaciones en el almacenamiento.
  UploadResult -> Tipo que representa el resultado de una operación subida.
  uploadString -> Para subir imágenes en formato de cadena (string).
  deleteObject -> Para eliminar un objeto en el almacenamiento (como una imagen).
*/

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  // Definimos la colección de productos de la base de datos de Firestore
  private productosCollection: AngularFirestoreCollection<Producto>;

  // Variable para almacenar la respuesta de la operación de subida de imagen
  private respuesta!: UploadResult;

  // Inicializamos la instancia de Firebase Storage
  private storage = getStorage();

  constructor(private database: AngularFirestore) {
    // Referenciamos la colección de productos en la base de datos de Firestore
    this.productosCollection = database.collection('producto');
  }

  // Método para CREAR productos
  crearProducto(producto: Producto, url: string){
    return new Promise(async (resolve, reject) => {
      try {
        // Creamos un nuevo ID para el producto en la base de datos
        const idProducto = this.database.createId();

        // Asignamos el ID generado al atributo idProducto de la interfaz Producto
        producto.idProducto = idProducto;

        // Asignamos la URL de la imagen al atributo imagen del producto
        producto.imagen = url;

        // Guardamos el producto en Firestore utilizando el ID generado
        const resultado = await this.productosCollection.doc(idProducto).set(producto);

        resolve(resultado);
      } catch (error) {
        reject(error);
      }
    });
  }

  // Método para OBTENER productos de la base de datos
  obtenerProducto(){
    // snapshotChanges toma una "instantánea" de los datos y map convierte los datos a formato adecuado
    return this.productosCollection.snapshotChanges().pipe(
      map(action => action.map(a => a.payload.doc.data()))
    );
  }

  // Método para EDITAR un producto
  modificarProducto(idProducto: string, nuevaData: Producto){
    // Actualizamos los datos del producto en Firestore utilizando el ID del producto
    return this.database.collection('producto').doc(idProducto).update(nuevaData);
  }

  // Método para ELIMINAR un producto de la base de datos y su imagen de Firebase Storage
  eliminarProducto(idProducto: string, imagenUrl: string){
    return new Promise((resolve, reject) => {
      try {
        // Referencia al archivo de imagen en Firebase Storage usando su URL
        const referenciaImagen = ref(this.storage, imagenUrl);

        // Eliminamos la imagen de Firebase Storage
        deleteObject(referenciaImagen)
        .then((res) => {
          // Eliminamos el producto de la base de datos Firestore
          const respuesta = this.productosCollection.doc(idProducto).delete();
          resolve(respuesta);
        })
        .catch(error => {
          reject("Error al eliminar la imagen: \n" + error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  // Método para OBTENER la URL de descarga de una imagen
  obtenerUrlImagen(respuesta: UploadResult){
    // Retorna la URL obtenida de la imagen subida
    return getDownloadURL(respuesta.ref);
  }

  /**
   * Método para SUBIR imágenes con sus referencias a Firebase Storage
   * @param {string} nombre - Nombre del archivo de imagen
   * @param {any} imagen - Datos de la imagen (en formato base64 o similar)
   * @param {string} ruta - Ruta dentro del almacenamiento en Firebase
   * @returns - Retorna la respuesta con la información sobre la subida de la imagen
   */
  async subirImagen(nombre: string, imagen: any, ruta: string){
    try {
      // Creamos una referencia para el archivo de imagen en Firebase Storage
      let referenciaImagen = ref(this.storage, ruta + '/' + nombre);

      // Subimos la imagen como una cadena base64 utilizando 'uploadString'
      this.respuesta = await uploadString(referenciaImagen, imagen, 'data_url')
      .then(resp => {
        return resp; // Retornamos el resultado de la subida
      });

      return this.respuesta;
    } catch (error) {
      console.log("Error al subir imagen: \n" + error);
      return this.respuesta; // Retornamos la respuesta, aunque haya ocurrido un error
    }
  }
}
