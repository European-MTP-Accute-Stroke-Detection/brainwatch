import { Reference } from "@angular/fire/compat/storage/interfaces";
import { Patient } from "./patient";

export interface Case {
    uid: string;
    date: Date;
    text: string;
    pid: string;
    userId:string;
}