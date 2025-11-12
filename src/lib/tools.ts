
import { tool } from "@langchain/core/tools";
import { z } from "zod";
import axios, { AxiosError } from "axios";
import { StudentProjection } from "@/types/student.type";

// Define interfaces (you might want to move these to a types file too)
interface StudentData {
    name: string;
    enrollment: string;
    programme: string;
    batch: string;
    percentage: number;
    cgpa: number;
}

// Helper function for error handling
const handleAxiosError = (error: unknown): string => {
    const axiosError = error as AxiosError<{ message: string }>;
    return axiosError?.response?.data?.message || "Something went wrong!";
};

// Student data tool
export const getStudentDataTool = tool(
    async ({ enrollment }: { enrollment: string }) => {
        try {
            const res = await axios(`${process.env.SERVER_URL}/api/v1/student/${enrollment}`);
            return JSON.stringify(res.data.data, null, 2);
        } catch (error) {
            return handleAxiosError(error);
        }
    },
    {
        name: "getStudentData",
        description: "Get student result details from database",
        schema: z.object({
            enrollment: z.string().describe("Student enrollment number"),
        }),
    }
);

// Top students tool
export const getTopStudentsTool = tool(
    async () => {
        try {
            const res = await axios(`${process.env.SERVER_URL}/api/v1/student/top-students`);
            return JSON.stringify(res.data.data, null, 2);
        } catch (error) {
            return handleAxiosError(error);
        }
    },
    {
        name: "getTopStudents",
        description: "Get top performers from all programmes",
        schema: z.object({}),
    }
);

// Programme batch tool
export const getProgrammeBatchTool = tool(
    async ({ programme }: { programme: string }) => {
        try {
            const res = await axios(`${process.env.SERVER_URL}/api/v1/programme/${programme}`);
            return JSON.stringify(res.data.data, null, 2);
        } catch (error) {
            return handleAxiosError(error);
        }
    },
    {
        name: "getProgrammeBatch",
        description: "Get specific programme's batches available in database",
        schema: z.object({
            programme: z.string().describe("Programme name like bca, bba, bcom"),
        }),
    }
);

// Programme result tool
export const getProgrammeResultTool = tool(
    async ({ programme, batch }: { programme: string; batch: string }) => {
        try {
            const res = await axios(`${process.env.SERVER_URL}/api/v1/programme/${programme}/${batch}`);
            const data: StudentProjection[] = res.data.data;
            
             const sortData = data?.sort((a: StudentProjection, b: StudentProjection) => {
                return (b?.cgpa || 0) - (a?.cgpa || 0); 
                });
            let i = 1;
            const summary = {
                totalStudent: sortData.length,
                topStudent: sortData.slice(0, 10).map((student: StudentProjection) => ({
                    name: student.name,
                    enrollment: student.enrollment,
                    programme: student.programme,
                    batch: student.batch,
                    percentage: student.percentage,
                    cgpa: student.cgpa,
                    rank: i++
                })),
                avgCGPA: (sortData.reduce((acc: number, curr: StudentData) => acc + (curr.cgpa || 0), 0) / sortData.length).toFixed(3),
            };
            
            return JSON.stringify(summary, null, 2);
        } catch (error) {
            return handleAxiosError(error);
        }
    },
    {
        name: "getProgrammeResult",
        description: "Get specific programme's batch result",
        schema: z.object({
            programme: z.string().describe("Programme name like bca, bba, bcom"),
            batch: z.string().describe("Batch like 2022, 2023"),
        }),
    }
);

// Student search by name tool
export const getStudentsByNameTool = tool(
    async ({ name, programme }: { name: string; programme?: string }) => {
        try {
            const params = new URLSearchParams({ name });
            if (programme) {
                params.append('programme', programme);
            }
            
            const res = await axios(`${process.env.SERVER_URL}/api/v1/student/search-by-name?${params.toString()}`);
            return JSON.stringify(res.data.data, null, 2);
        } catch (error) {
            return handleAxiosError(error);
        }
    },
    {
        name: "getStudentsByName",
        description: "Search students by name with optional programme filter",
        schema: z.object({
            name: z.string().describe("Student name to search for"),
            programme: z.string().optional().describe("Optional programme filter like bca, bba, bcom"),
        }),
    }
);



// Export all tools as an array for easy consumption
export const allTools = [
    getStudentDataTool,
    getTopStudentsTool,
    getProgrammeBatchTool,
    getProgrammeResultTool,
    getStudentsByNameTool,
];

// Export individual tools for specific use cases
const toolsExport = {
    getStudentDataTool,
    getTopStudentsTool,
    getProgrammeBatchTool,
    getProgrammeResultTool,
    getStudentsByNameTool,
    allTools,
};

export default toolsExport;