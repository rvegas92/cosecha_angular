import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/services/auth.service';
import { DexieService } from '../../shared/dixiedb/dexie-db.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  mensajeLogin: String = '';
  loginForm: FormGroup;
  private authService = inject( AuthService );
  private dexieService = inject( DexieService );

  constructor(private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^[0-9]*$')]],  // Campo requerido
      clave: ['', Validators.required]
    });
  }
  
  login() {
    this.router.navigate(['/main/parametros']);
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      try {
        this.authService.login(loginData.usuario, loginData.clave).subscribe(async (resp)=> {
          if (!!resp && resp.length > 0) {
            if (resp > 1) {
              this.mensajeLogin = 'El usuario cuenta con más de una cuenta, comuníquese con su administrador del servicio.';
            } else {
              // await this.saveUsuario(resp[0]); // Si esta es una función asincrónica
              await this.dexieService.saveUsuario(resp[0]);
              this.login();
            }
          } else {
            this.mensajeLogin = 'El usuario no se encuentra registrado.';
          }
        });
      } catch (error) {
        console.error('Error en el login: ', error);
        this.mensajeLogin = 'Hubo un error en el login, por favor intente nuevamente.';
        Swal.fire({
          title: this.mensajeLogin,
        })
      }
    } else {
      console.log('Formulario inválido');
    }
  }

}
