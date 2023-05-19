import { AngularFirestoreCollection, DocumentReference } from "@angular/fire/compat/firestore";
import { Case } from "./case";
import { User } from "./user";

export interface Patient {
    uid?: string; // Optional because not set when creating
    firstname: string;
    lastname: string;
    gender: string;
    age: number;
    bmi?: number;
    email?: string;
    work?: string;
    residency?: string;
    averageGlucoseLevel?: number;
    hypertension?: boolean;
    heartDisease?: boolean;
    married?: boolean;
    smoke?: boolean;

    // Complex Properties
    user?: User;
    patientRef?: AngularFirestoreCollection<Patient>;
    userRef?: DocumentReference<User>;
}

export interface PatientDoc extends Omit<Patient, 'cases' | 'user'> {

}