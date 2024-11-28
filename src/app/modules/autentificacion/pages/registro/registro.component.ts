// Importaciones necesarias para el funcionamiento del componente

// Component de Angular para crear el componente 'RegistroComponent'
import { Component } from '@angular/core';

// Importamos el modelo de Usuario que define la estructura del objeto de usuario
import { Usuario } from 'src/app/models/usuario';

// Servicio para la autentificación de usuarios (iniciar sesión, registrar, etc.)
import { AuthService } from '../../services/auth.service';

// Servicio para interactuar con Firestore (base de datos en la nube de Firebase)
import { FirestoreService } from 'src/app/modules/shared/services/firestore.service';

// Servicio de rutas de Angular para la navegación entre vistas
import { Router } from '@angular/router';

// Paquetería para la criptación de contraseñas (SHA-256)
import * as CryptoJS from 'crypto-js';

// Paquetería para mostrar alertas personalizadas (SweetAlert)
import Swal from 'sweetalert2';

// Definición del componente
@Component({
  selector: 'app-registro',  // Selector del componente que se usará en el HTML
  templateUrl: './registro.component.html',  // Archivo de plantilla HTML
  styleUrls: ['./registro.component.css']  // Archivo de estilos CSS
})
export class RegistroComponent {
  
  // Variable que oculta o muestra el campo de la contraseña (por seguridad)
  hide = true;

  // Definición de un modelo de Usuario inicial
  usuarios: Usuario = {
    uid: '',
    nombre: '',
    apellido: '',
    email: '',
    rol: 'usuario',  // Rol por defecto es 'usuario'
    password: ''
  }

  // Colección de usuarios (se utiliza para almacenar temporalmente los datos antes de enviarlos)
  coleccionUsuarios: Usuario[] = [];

  // Inyección de dependencias: Servicios que se utilizarán en este componente
  constructor(
    public servicioAuth: AuthService,  // Servicio para autentificación de usuarios
    public servicioFirestore: FirestoreService,  // Servicio para interactuar con Firestore
    public servicioRutas: Router  // Servicio de navegación
  ){}

  // Método asincrónico para el registro de usuarios
  async registrar(){
    // Crear las credenciales del usuario con los datos del formulario
    const credenciales = {
      email: this.usuarios.email,
      password: this.usuarios.password
    }

    // Realizar el registro con el servicio de autenticación
    const res = await this.servicioAuth.registrar(credenciales.email, credenciales.password)
    .then(res => {
      // Al registrarse correctamente, mostrar una alerta de éxito
      Swal.fire({
        title: "¡Buen trabajo!",
        text: "¡Se pudo registrar con éxito! :)",
        icon: "success"
      });

      // Redirigir al usuario a la vista 'inicio' después del registro exitoso
      this.servicioRutas.navigate(['/inicio']);
    })
    // En caso de error al registrar, mostrar una alerta de error
    .catch(error => {
      Swal.fire({
        title: "¡Oh no!",
        text: "Hubo un problema al registrar el nuevo usuario :(",
        icon: "error"
      });
    })

    // Obtener el UID del usuario autenticado
    const uid = await this.servicioAuth.obtenerUid();
    this.usuarios.uid = uid;

    // Encriptar la contraseña del usuario antes de guardarla
    this.usuarios.password = CryptoJS.SHA256(this.usuarios.password).toString();

    // Guardar el usuario en Firestore
    this.guardarUsuario();

    // Limpiar los campos del formulario después de registrar
    this.limpiarInputs();
  }

  // Método para guardar el usuario en la base de datos Firestore
  async guardarUsuario(){
    this.servicioFirestore.agregarUsuario(this.usuarios, this.usuarios.uid)
    .then(res => {
      console.log(this.usuarios);  // Imprimir el usuario en la consola si el guardado es exitoso
    })
    .catch(err => {
      console.log('Error =>', err);  // Imprimir un error si falla el guardado
    })
  }

  // Método para limpiar los campos del formulario
  limpiarInputs(){
    // Reseteamos todas las propiedades del objeto 'usuarios' para limpiar el formulario
    const inputs = {
      uid: this.usuarios.uid = '',
      nombre: this.usuarios.nombre = '',
      apellido: this.usuarios.apellido = '',
      email: this.usuarios.email = '',
      rol: this.usuarios.rol = '',
      password: this.usuarios.password = ''
    }
  }
}
