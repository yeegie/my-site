import { IWorkResponse } from "@/shared/types";

export interface WorkProps {
    works: IWorkResponse[]
    editMode?: boolean
    className?: string
}