import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent {
  user: User;

  constructor(
    public authService: AuthService
  ) {
    this.user = JSON.parse(localStorage.getItem('user')!);
  }
}
