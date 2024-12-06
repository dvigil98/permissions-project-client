import { Component, OnInit } from '@angular/core';
import { Role } from '../../../models/role.model';
import { RolePermission } from '../../../models/role-permission.model';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { RoleService } from '../../../services/role.service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../services/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assing-permissions',
  templateUrl: './assing-permissions.component.html',
  styleUrl: './assing-permissions.component.css'
})
export class AssingPermissionsComponent implements OnInit {

  role: Role = {};
  rolePermissions: RolePermission[] = [];
  modules: any[] = [];

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private commonService: CommonService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.getRole(Number(id));
    this.getModules();
    this.getRolePermissionsByRole(Number(id));
    this.form = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      permissions: this.fb.array([])
    });
  }

  get permissions() {
    return this.form.get('permissions') as FormArray;
  }

  onSubmit() {
    let id = this.route.snapshot.paramMap.get('id');

    const selectedOptions = this.permissions.controls
      .map((control, index) => control.value == 1
        ? { id: this.rolePermissions[index].id, active: true }
        : { id: this.rolePermissions[index].id, active: false });

    let rp: any[] = [];

    selectedOptions.forEach(selected => {
      rp.push(selected)
    });

    console.log(rp);

    this.roleService.setRolePermissionsToRole(rp, Number(id)).subscribe({
      next: (r) => {

        console.log(r);

        Swal.fire({
          title: '¡Exito!',
          text: 'Datos guardados',
          icon: 'success'
        });

      },
      error: (e) => {

        console.log(e);

        Swal.fire({
          title: '¡Ooops!',
          text: 'Datos no guardados',
          icon: 'error'
        });

      }
    });

  }

  getRole(id: number) {
    this.roleService.getRole(id).subscribe({
      next: (r) => {
        this.role = r.data;
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  getRolePermissionsByRole(role_id: number) {
    this.roleService.getRolePermissionsByRole(role_id).subscribe({
      next: (r) => {
        this.rolePermissions = r.data;
        this.rolePermissions.forEach(rolePermission => {
          this.permissions.push(this.fb.control(rolePermission.active));
        });
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  getModules() {
    this.commonService.getModules().subscribe({
      next: (r) => {
        this.modules = r.data;
      },
      error: (e) => {
        console.log(e);
      }
    })
  }
}
