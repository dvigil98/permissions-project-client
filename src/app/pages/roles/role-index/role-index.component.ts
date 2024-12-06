import { Component, OnInit } from '@angular/core';
import { Role } from '../../../models/role.model';
import { RoleService } from '../../../services/role.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-role-index',
  templateUrl: './role-index.component.html',
  styleUrl: './role-index.component.css'
})
export class RoleIndexComponent implements OnInit {

  p: number = 1;
  roles: Role[] = [];

  searchBy: any[] = [
    { value: 'name', text: 'Nombre' }
  ];

  constructor(
    private roleService: RoleService,
    protected authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles(): void {
    this.roleService.getRoles().subscribe({
      next: (r) => {
        this.roles = r.data;
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  deleteRole(id?: number): void {
    Swal.fire({
      title: "¡Advertencia!",
      text: "¿Está seguro de eliminar este registro?",
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: "#007bff",
      cancelButtonColor: "#343a40",
      confirmButtonText: "Eliminar",
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.roleService.deleteRole(Number(id)).subscribe({
          next: (r) => {

            this.getRoles();

            Swal.fire({
              title: '¡Exito!',
              text: 'Datos eliminados',
              icon: 'success'
            });

          },
          error: (e) => {
            console.log(e);

            Swal.fire({
              title: 'Oops!',
              text: 'Datos no eliminados',
              icon: 'error'
            });

          }
        });
      }
    });
  }

  searchRoles(searchData: any): void {
    this.roleService.searchRoles(searchData.critery, searchData.value).subscribe({
      next: (r) => {
        this.roles = r.data;
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  clear(): void {
    this.getRoles();
  }
}
