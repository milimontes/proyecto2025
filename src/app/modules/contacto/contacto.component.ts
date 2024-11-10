import { Component } from '@angular/core';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  contact = {
    name: '',
    email: '',
    message: ''
  };

  // Método que maneja el envío del formulario
  onSubmit(contactForm: any) {
    if (this.contact.name && this.contact.email && this.contact.message) {
      console.log('Formulario enviado', this.contact);
      // Lógica para enviar los datos a un servidor o API

      // Limpia el formulario después de enviarlo
      contactForm.reset();
      this.contact = { name: '', email: '', message: '' };
    } else {
      console.log('Por favor completa todos los campos.');
    }
  }
}
