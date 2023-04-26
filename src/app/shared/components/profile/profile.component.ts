import { Component, OnInit } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserService } from 'src/app/auth/services/user.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;

  constructor(
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.userService.currentUser.valueChanges()
      .subscribe(user => this.user = user);
  }
}
