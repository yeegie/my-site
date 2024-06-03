import { ICategoryResponse } from './categoryTypes';
import { IStackResponse } from './stackTypes';
import { IImageResponse } from './imageTypes';
import { IUrlResponse } from './urlTypes';

export interface IWorkResponse {
    id: number
    title: string
    description_short: string
    description_full: string
    category: ICategoryResponse[]
    stack: IStackResponse[]
    image: IImageResponse[]
    url: IUrlResponse[]
    is_active: boolean
}