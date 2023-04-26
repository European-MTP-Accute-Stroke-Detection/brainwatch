import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FirebaseError } from '@angular/fire/app';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit {

  @ViewChild('form', { static: true }) form: NgForm;

  generalErrorMessage: string;
  passwordErrorMessage: string;
  emailErrorMessage: string;

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngAfterViewInit(): void {
    this.form.valueChanges.subscribe(change => {
      this.generalErrorMessage = '';
    });
  }

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.router.navigateByUrl('/cases')
    }
    this.authService.errorPipe.subscribe((error: FirebaseError) => {
      if (error)
        switch (error.code) {
          case 'auth/email-already-in-use':
            this.form.controls['email'].setErrors({ 'invalid': true });
            this.emailErrorMessage = this.sanitizeError(error.message);
            break;
          case 'auth/weak-password':
            this.form.controls['password'].setErrors({ 'invalid': true });
            this.passwordErrorMessage = this.sanitizeError(error.message);
            break;
          default:
            this.generalErrorMessage = this.sanitizeError(error.message);
        }
    });
  }

  sanitizeError(error: string) {
    return error.split(/\s\(|:\s/)[1];
  }
}
