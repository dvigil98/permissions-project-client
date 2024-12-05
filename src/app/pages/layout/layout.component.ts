import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {

  initialLetter: string = '';
  userName: string = '';
  roleName: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let user = JSON.parse(this.authService.getUser());
    this.userName = user.user.name;
    this.initialLetter = this.userName[0];
    this.roleName = user.user.role.name;
  }

  logout() {

    let user = JSON.parse(this.authService.getUser());

    this.authService.logout(user.access_token).subscribe({
      next: (r) => {

        Swal.fire({
          title: '¡Exito!',
          text: 'Sesión finalizada',
          icon: 'success'
        });

        this.authService.deleteUser();
        this.router.navigate(['/login']);

      },
      error: (e) => {
        console.log(e);

        this.authService.deleteUser();
        this.router.navigate(['/login']);
      }
    });
  }
}
