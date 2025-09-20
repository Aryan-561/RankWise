import mongoose, { Schema, Document } from "mongoose";

// TypeScript interfaces
export interface Subject {
    paperId: string;
    paperCode: string;
    paperName: string;
    type?: string;
    credits?: number;
    internal: number;
    external: number;
    total: number;
    reappear: boolean;
    backlog: boolean;
    grade: string;
}

export interface Semester {
    sem: number;
    subjectCount?: number;
    subjects: Subject[];
    totalMarks?: number;
    maxMarks?: number;
    totalCredits?: number;
    maxCredits?: number;
    totalCreditMarks?: number;
    maxCreditMarks?: number;
    percentage?: number;
    creditPercentage?: number;
    sgpa?: number;
}

export interface Student extends Document {
    enrollment: string;
    name: string;
    sid?: string;
    schemeID?: string;
    instCode?: number;
    batch: string;
    prgCode: string;
    programme: string;
    semesters: Semester[];
}

const semesterSchema = new Schema<Semester>({
    sem: {
        type: Number,
        required: true,
    },
    subjectCount: Number,
    subjects: [
        new Schema(
        {
            paperId: {
                type: String,
                required: true,
            },

            paperCode:{
                type: String,
                required: true,
            },

            paperName: {
                type: String,
                required: true,
            },

            type:{type: String},
            credits: Number,
            internal: {
                type: Number,
                default: 0,
            },

            external: {
                type: Number,
                default: 0,
            },

            total: {
                type: Number,
                default: 0,
            },

            reappear:{
                type: Boolean,
                default: false,
            },

            backlog: {
                type: Boolean, 
                default: false,
            },
            
            grade: {
                type: String,
                default: "",
            },
        },{_id:false})
    ],
    totalMarks: Number,
    maxMarks: Number,
    totalCredits: Number,
    maxCredits: Number,
    totalCreditMarks: Number,
    maxCreditMarks: Number,
    percentage: Number,
    creditPercentage: Number,
    sgpa:Number,
    
},{_id:false});

const studentSchema = new Schema<Student>({
    enrollment: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },

    name: {
        type: String,
        required: true,
        index: true,
    },

    sid: String,
    schemeID: String,
    instCode: Number,
    batch: {
        type: String,
        required: true,
        index: true,
    },
    prgCode: {
        type:String,
        required:true,
        index:true,
    },
    programme: {
        type: String,
        required: true,    
    },
    semesters: [semesterSchema],
});

export const StudentModel =  mongoose.models.Student as mongoose.Model<Student> || mongoose.model<Student>("Student", studentSchema);