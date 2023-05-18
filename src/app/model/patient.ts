import { Case } from "./case";

export interface Patient {
    patientId?:string;
    userId?:any;
    firstname: string;
    lastname: string;
    email: string;
    gender: string;
    age: number;
    bmi: number;
    work: string;
    residency: string;
    averageGlucoseLevel: number;
    hypertension:boolean;
    heartDisease :boolean;
    married: boolean;
    smoke: boolean;
    cases?: Case[];
}