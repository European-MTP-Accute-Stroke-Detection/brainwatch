import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-box',
  templateUrl: './auth-box.component.html',
  styleUrls: ['./auth-box.component.scss']
})
export class AuthBoxComponent {

  @Input('title') title: string;

}
