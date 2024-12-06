import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-show',
  templateUrl: './user-show.component.html',
  styleUrl: './user-show.component.css'
})
export class UserShowComponent implements OnInit {

  user: User = {};

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.getUser(Number(id));
  }

  getUser(id: number): void {
    this.userService.getUser(id).subscribe({
      next: (r) => {
        this.user = r.data;
      },
      error: (e) => {
        console.log(e);
      }
    });
  }
}
