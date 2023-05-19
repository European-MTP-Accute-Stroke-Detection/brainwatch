import { CollectionReference, DocumentReference } from "@angular/fire/compat/firestore";
import { Patient } from "./patient";
import { User } from "./user";

export interface Case {
    uid: string;
    date: Date;
    notes: string;
    patient?: Patient;
    user: User;
    patientRef?: DocumentReference<Patient>;
    userRef: DocumentReference<User>;
}