import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from '../../../models/role.model';
import { RoleService } from '../../../services/role.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrl: './role-create.component.css'
})
export class RoleCreateComponent implements OnInit {

  form!: FormGroup;
  submitted = false;
  role?: Role;

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService
  ) { }

  ngOnInit(): void {
    this.form = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  saveRole(): void {

    this.submitted = true;

    if (this.form.valid) {

      this.role = {
        id: 0,
        name: this.form.value.name
      };

      this.roleService.saveRole(this.role).subscribe({
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
}
