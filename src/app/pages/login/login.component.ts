import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login(): void {

    this.submitted = true;

    if (this.form.valid) {

      this.authService.login(this.form.value.email, this.form.value.password).subscribe({
        next: (r) => {

          this.submitted = false;
          this.form.reset();

          Swal.fire({
            title: '¡Exito!',
            text: 'Sesión iniciada',
            icon: 'success'
          });

          let dataUser = {
            user: r.data.user,
            role_permissions: r.data.role_permissions,
            token_type: r.data.token_type,
            access_token: r.data.access_token
          };

          this.authService.setUser(dataUser);

          this.router.navigate(['/admin/dashboard']);

        },
        error: (e) => {

          Swal.fire({
            title: '¡Ooops!',
            text: `${e.error.errors}`,
            icon: 'error'
          });

        }
      })

    } else {

      Swal.fire({
        title: "¡Oops!",
        text: "Llene los campos requeridos",
        icon: "error"
      });

    }
  }

  //
  get requiredEmail(): boolean {
    return (this.form.get('email')?.errors?.['required'] && this.submitted) || (this.form.get('email')?.errors?.['required'] && this.form.get('email')?.dirty);
  }

  get validEmail(): boolean {
    return (this.form.get('email')?.errors?.['email']);
  }

  get requiredPassword(): boolean {
    return (this.form.get('password')?.errors?.['required'] && this.submitted) || (this.form.get('password')?.errors?.['required'] && this.form.get('password')?.dirty);
  }
}
