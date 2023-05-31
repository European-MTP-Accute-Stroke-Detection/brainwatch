import { Component, Input } from '@angular/core';
import { Case } from 'src/app/model/case';

@Component({
  selector: 'app-case-info',
  templateUrl: './case-info.component.html',
  styleUrls: ['./case-info.component.scss']
})
export class CaseInfoComponent {

  @Input('case') case: any;

}
