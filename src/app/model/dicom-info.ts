export interface DicomInfo {
    StudyDescription: InfoObj;
    SliceLocation: InfoObjMulti;
    SliceThickness: InfoObj;
}

interface InfoObj {
    element: string;
    vr: string;
    value: string;
    group: string;
    vl: number
}

interface InfoObjMulti {
    value: {
        [index: string]: InfoObj;
    }
}