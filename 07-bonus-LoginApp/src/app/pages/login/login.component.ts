import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme = false;

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();

    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  login(form: NgForm) {
    if (form.invalid) { return; }

    Swal.fire({
      allowOutsideClick: false,
      text: 'Expere por favor...',
      icon: 'info'
    });
    Swal.showLoading();

    // console.log('formulario enviado', this.usuario, form);

    this.auth.login(this.usuario)
      .subscribe((resp) => {
        console.log(resp);
        Swal.close();

        if (this.recordarme) {
          localStorage.setItem('email', this.usuario.email);
        } else {
          localStorage.removeItem('email');
        }

        this.router.navigateByUrl('/home');

      }, (err) => {
          console.error(err.error.error.message);
          
          Swal.fire({
            allowOutsideClick: false,
            title: 'Error al autenticar',
            icon: 'error',
            text: err.error.error.message
          });
      });
  }

}
