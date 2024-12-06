import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrl: './user-index.component.css'
})
export class UserIndexComponent implements OnInit {

  p: number = 1;
  users: User[] = [];

  searchBy: any[] = [
    { value: 'users.name', text: 'Nombre' },
    { value: 'users.email', text: 'Email' },
    { value: 'roles.name', text: 'Rol' }
  ];

  constructor(
    private userService: UserService,
    protected authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe({
      next: (r) => {
        this.users = r.data;
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  deleteUser(id?: number): void {
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
        this.userService.deleteUser(Number(id)).subscribe({
          next: (r) => {

            this.getUsers();

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

  searchUsers(searchData: any): void {
    this.userService.searchUsers(searchData.critery, searchData.value).subscribe({
      next: (r) => {
        this.users = r.data;
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  clear(): void {
    this.getUsers();
  }
}
