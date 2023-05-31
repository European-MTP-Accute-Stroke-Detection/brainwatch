export interface TabularPrediction {
    gender: string,
    age: number,
    hypertension: boolean,
    heart_disease: boolean,
    ever_married: string, // yes / no
    work_type: string,
    Residence_type: string,
    avg_glucose_level: number,
    bmi: number,
    smoking_status: string
}

export interface TabularPredictionResult {
    gender: number,
    age: number,
    hypertension: number,
    heart_disease: number,
    ever_married: number, // yes / no
    work_type: number,
    Residence_type: number,
    avg_glucose_level: number,
    bmi: number,
    smoking_status: number;
    result: number;
    probability_stroke: number;
    probability_no_stroke: number;
}

