import { IImageResponse, IStackResponse } from "@/shared/types";

export interface WorkCardProps {
  id: number;
  title: string;
  description_short: string;
  image?: Array<IImageResponse>;
  stack?: Array<IStackResponse>;
  editMode: boolean;
}
