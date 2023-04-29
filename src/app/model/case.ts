import { DocumentReference } from '@angular/fire/compat/firestore';
import { Scan } from './scan'
import { Patient } from './patient';

export interface Case {
    uid: string;
    date: any;
    name: string;
    scans: Scan[];
    notes: string;
    patient: DocumentReference<Patient>;
}