import { Component, Input } from '@angular/core';
import { Patient } from 'src/app/model/patient';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.scss']
})
export class PatientInfoComponent {

  @Input('patient') patient: Patient;

}
