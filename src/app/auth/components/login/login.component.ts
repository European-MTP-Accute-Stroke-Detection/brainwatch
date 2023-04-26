import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, NgForm } from '@angular/forms';
import { FirebaseError } from 'firebase/app';
import { ErrorFactory } from '@firebase/util';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('form', { static: true }) form: NgForm;

  generalErrorMessage: string;
  passwordErrorMessage: string;
  emailErrorMessage: string;

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngAfterViewInit(): void {
    this.form.valueChanges.subscribe(change => { this.generalErrorMessage = '' });
  }

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.router.navigateByUrl('/cases')
    }
    this.authService.errorPipe.subscribe((error: FirebaseError) => {
      if (error)
        switch (error?.code) {
          case 'auth/invalid-email':
          case 'auth/user-not-found':
            this.form.controls['email'].setErrors({ 'invalid': true });
            this.emailErrorMessage = this.sanitizeError(error.message);
            break;
          case 'auth/wrong-password':
            this.form.controls['password'].setErrors({ 'invalid': true });
            this.passwordErrorMessage = this.sanitizeError(error.message);
            break;
          default:
            this.generalErrorMessage = this.sanitizeError(error.message);
        }
    });

  }


  sanitizeError(error: string) {
    return error.split(/\.\s|:\s/)[1];
  }

}
