import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, NgForm } from '@angular/forms';
import { FirebaseError } from 'firebase/app';
import { ErrorFactory } from '@firebase/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('form', { static: true }) form: NgForm;

  generalErrorMessage: string;
  passwordErrorMessage: string;
  emailErrorMessage: string;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
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
    this.form.valueChanges.subscribe(change => { this.generalErrorMessage = '' });
  }

  sanitizeError(error: string) {
    return error.split(/\.\s|:\s/)[1];
  }

}
