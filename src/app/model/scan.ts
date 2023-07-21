export interface Scan {
    uid: string;
    downloadUrl: string;
    buffer: any;
    dicom_uid: string;
    results_combined: PredictionResult;
    results_hemmorrhage: PredictionResult;
    results_ischemic: PredictionResult;
}

export interface PredictionResult {
    prediction: {
        predictions: number[];
        result: string;
        uncertainty: number[];
    }
}