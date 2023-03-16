import { Component, OnInit, ViewEncapsulation } from '@angular/core';
//import { TagsDialogComponent } from './tags-dialog.component';

// gui overrides

@Component({
  selector: 'app-workbench-home',
  templateUrl: './workbench-home.component.html',
  styleUrls: ['./workbench-home.component.scss']
})
export class WorkbenchHomeComponent implements OnInit {
  
  loadProgress = 0;
  
  ngOnInit(): void {
    
  }

}
