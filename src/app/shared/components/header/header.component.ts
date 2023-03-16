import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  
  // @ViewChild('sidenav', { static: true }) 
  // sidenav!: MatSidenav;

  ngOnInit() {
    
  }


}
