import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  hasPermission: boolean = false;

  constructor(
    protected authService: AuthService
  ) { }

  ngOnInit(): void {
    this.hasPermission = this.authService.hasPermission('ver_dashboard');
  }
}
