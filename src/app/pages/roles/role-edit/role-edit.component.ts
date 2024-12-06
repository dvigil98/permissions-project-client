import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from '../../../models/role.model';
import { RoleService } from '../../../services/role.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrl: './role-edit.component.css'
})
export class RoleEditComponent implements OnInit {

  form!: FormGroup;
  submitted = false;
  role: Role = {};

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.getRole(Number(id));
    this.form = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  getRole(id: number): void {
    this.roleService.getRole(id).subscribe({
      next: (r) => {
        this.role = r.data;
        this.form.patchValue(this.role);
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  updateRole(): void {

    this.submitted = true;

    if (this.form.valid) {

      this.role = {
        id: this.role.id,
        name: this.form.value.name
      };

      this.roleService.updateRole(this.role, Number(this.role.id)).subscribe({
        next: (r) => {

          this.submitted = false;
          this.form.reset();

          Swal.fire({
            title: '¡Exito!',
            text: 'Datos actualizados',
            icon: 'success'
          });

          this.router.navigate(['/admin/roles']);
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
}
