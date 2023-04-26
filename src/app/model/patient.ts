import { Case } from "./case";

export interface Patient {
    uid: string;
    firstname: string;
    lastname: string;
    gender: string;
    age: number;
    cases?: Case[];
}