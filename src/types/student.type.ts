import { IStudent } from "@/model/student.model";

// Interface for getStudentByName API response
export interface StudentByNameResponse {
    enrollment: string;
    name: string;
    sid?: string;
    schemeID?: string;
    instCode?: number;
    batch: string;
    prgCode: string;
    programme: string;
    cgpa?: number;
}

// Extended interface for detailed student projections
export interface StudentProjection extends IStudent {
    totalMarks: number;
    maxMarks: number;
    totalCreditMarks: number;
    maxCreditMarks: number;
    semestersCount: number;
    totalCredits: number;
    maxCredits: number;
    cgpa: number;
    percentage: number;
    creditPercentage: number;
}

export interface TopStudentsResponse {
    enrollment: string,
    name: string,
    instCode: number,
    batch: string,
    prgCode: string,
    programme: string,
    cgpa: number
}