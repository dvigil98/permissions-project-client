import { Component, OnInit } from '@angular/core';
import { Role } from '../../../models/role.model';
import { RoleService } from '../../../services/role.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-role-show',
  templateUrl: './role-show.component.html',
  styleUrl: './role-show.component.css'
})
export class RoleShowComponent implements OnInit {

  role: Role = {};

  constructor(
    private roleService: RoleService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.getRole(Number(id));
  }

  getRole(id: number): void {
    this.roleService.getRole(id).subscribe({
      next: (r) => {
        this.role = r.data;
      },
      error: (e) => {
        console.log(e);
      }
    });
  }
}
