import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from 'src/app/modules/shared/services/firestore.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent {
  // Variable para controlar la visibilidad de la contraseña en el campo de entrada
  hide = true;

  // Constructor que inyecta los servicios de autenticación, Firestore y navegación de rutas
  constructor(
    public servicioAuth: AuthService,
    public servicioFirestore: FirestoreService,
    public servicioRutas: Router
  ) { }

  // Objeto usuarioIngresado que representa al usuario que intenta iniciar sesión.
  usuarioIngresado: Usuario = {
    uid: '',
    nombre: '',
    apellido: '',
    email: '',
    rol: '',
    password: ''
  }

  // Función para iniciar sesión del usuario
  async iniciarSesion() {
    // Objeto credenciales que recoge los datos ingresados en el formulario (email y contraseña)
    const credenciales = {
      email: this.usuarioIngresado.email,
      password: this.usuarioIngresado.password
    }

    try {
      // Busca el usuario en la base de datos de Firestore usando el correo electrónico ingresado
      const usuarioBD = await this.servicioAuth.obtenerUsuario(credenciales.email);

      // Verifica si el usuario existe en la base de datos
      if (!usuarioBD || usuarioBD.empty) {
        // Muestra una alerta de error si el correo electrónico no está registrado
        Swal.fire({
          text: "Correo electrónico no registrado",
          icon: "error",
          confirmButtonColor: '#A4D5DF' // Color personalizado para el botón "OK"
        });
        this.limpiarInputs(); // Limpia los campos del formulario
        return; // Sale de la función si el usuario no está registrado
      }
      
      // Toma el primer documento de la colección de usuarios obtenida
      const usuarioDoc = usuarioBD.docs[0];

      // Convierte los datos del documento en un objeto de tipo Usuario
      const usuarioData = usuarioDoc.data() as Usuario;

      // Cifra la contraseña ingresada usando SHA-256 para compararla con la de la base de datos
      const hashedPassword = CryptoJS.SHA256(credenciales.password).toString();

      // Compara la contraseña ingresada cifrada con la contraseña almacenada en la base de datos
      if (hashedPassword !== usuarioData.password) {
        // Muestra una alerta si la contraseña es incorrecta
        Swal.fire({
          text: "Contraseña incorrecta",
          icon: "error",
          confirmButtonColor: '#A4D5DF' // Color personalizado para el botón "OK"
        });

        this.usuarioIngresado.password = ''; // Limpia el campo de contraseña
        return; // Sale de la función si la contraseña es incorrecta
      }

      // Inicia la sesión del usuario en el sistema
      const res = await this.servicioAuth.iniciarSesion(credenciales.email, credenciales.password)
        .then(res => {
          // Muestra una alerta de éxito si el inicio de sesión es exitoso
          Swal.fire({
            text: "¡Se ha logueado con éxito! :D",
            icon: "success",
            confirmButtonColor: '#A4D5DF' // Color personalizado para el botón "OK"
          });

          // Navega a la página de inicio
          this.servicioRutas.navigate(['/inicio']);
        })
        .catch(err => {
          // Muestra una alerta de error si ocurre un problema al iniciar sesión
          Swal.fire({
            text: "Hubo un problema al iniciar sesión: " + err,
            icon: "error",
            confirmButtonColor: '#A4D5DF' // Color personalizado para el botón "OK"
          });

          this.limpiarInputs(); // Limpia los campos del formulario
        });
    } catch (error) {
      // En caso de error, limpia los campos del formulario
      this.limpiarInputs();
    }
  }

  // Función para limpiar los campos de entrada de email y contraseña
  limpiarInputs() {
    this.usuarioIngresado.email = ''; // Limpia el campo de email
    this.usuarioIngresado.password = ''; // Limpia el campo de contraseña
  }
}
