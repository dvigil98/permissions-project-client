import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';
import { RoleService } from '../../../services/role.service';
import { Role } from '../../../models/role.model';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css'
})
export class UserCreateComponent implements OnInit {

  form!: FormGroup;
  submitted = false;
  user?: User;
  roles: Role[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.getRoles();
    this.form = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role_id: ['', [Validators.required]],
    });
  }

  getRoles(): void {
    this.commonService.getRoles().subscribe({
      next: (r) => {
        this.roles = r.data;
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  saveUser(): void {

    this.submitted = true;

    if (this.form.valid) {

      this.user = {
        id: 0,
        name: this.form.value.name,
        email: this.form.value.email,
        password: this.form.value.password,
        role_id: this.form.value.role_id
      };

      this.userService.saveUser(this.user).subscribe({
        next: (r) => {

          this.submitted = false;
          this.form.reset();

          Swal.fire({
            title: '¡Exito!',
            text: 'Datos guardados',
            icon: 'success'
          });

        },
        error: (e) => {
          console.log(e);

          Swal.fire({
            title: '¡Oops!',
            text: 'Datos no guardados',
            icon: 'error'
          });

        }
      });

    } else {

      Swal.fire({
        title: "¡Oops!",
        text: "Llene los campos requeridos",
        icon: "error"
      });

    }
  }

  //
  get requiredName(): boolean {
    return (this.form.get('name')?.errors?.['required'] && this.submitted) || (this.form.get('name')?.errors?.['required'] && this.form.get('name')?.dirty);
  }

  get requiredEmail(): boolean {
    return (this.form.get('email')?.errors?.['required'] && this.submitted) || (this.form.get('email')?.errors?.['required'] && this.form.get('email')?.dirty);
  }

  get validEmail(): boolean {
    return (this.form.get('email')?.errors?.['email']);
  }

  get requiredPassword(): boolean {
    return (this.form.get('password')?.errors?.['required'] && this.submitted) || (this.form.get('password')?.errors?.['required'] && this.form.get('password')?.dirty);
  }

  get requiredRoleId(): boolean {
    return (this.form.get('role_id')?.errors?.['required'] && this.submitted) || (this.form.get('role_id')?.errors?.['required'] && this.form.get('role_id')?.dirty);
  }
}
