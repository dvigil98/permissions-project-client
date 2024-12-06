import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../models/user.model';
import { Role } from '../../../models/role.model';
import { UserService } from '../../../services/user.service';
import { RoleService } from '../../../services/role.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit {

  form!: FormGroup;
  submitted = false;
  user: User = {};
  roles: Role[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private commonService: CommonService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.getUser(Number(id));
    this.getRoles();
    this.form = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', []],
      role_id: ['', [Validators.required]],
      active: ['', [Validators.required]]
    });
  }

  getUser(id: number): void {
    this.userService.getUser(id).subscribe({
      next: (r) => {
        this.user = r.data;
        this.user.role_id = this.user.role?.id
        this.form.patchValue(this.user);
      },
      error: (e) => {
        console.log(e);
      }
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

  updateUser(): void {

    this.submitted = true;

    if (this.form.valid) {

      console.log(this.form.value);

      this.user = {
        id: this.user.id,
        name: this.form.value.name,
        email: this.form.value.email,
        password: this.form.value.password,
        role_id: this.form.value.role_id,
        active: (this.form.value.active == 1) ? true : false
      };

      this.userService.updateUser(this.user, Number(this.user.id)).subscribe({
        next: (r) => {

          this.submitted = false;
          this.form.reset();

          Swal.fire({
            title: '¡Exito!',
            text: 'Datos actualizados',
            icon: 'success'
          });

          this.router.navigate(['/admin/users']);
        },
        error: (e) => {
          console.log(e);

          Swal.fire({
            title: '¡Oops!',
            text: 'Datos no actualizados',
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

  get requiredActive(): boolean {
    return (this.form.get('active')?.errors?.['required'] && this.submitted) || (this.form.get('active')?.errors?.['required'] && this.form.get('active')?.dirty);
  }
}
