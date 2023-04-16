import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  constructor(
    public authService: AuthService
  ) {
  }
}
