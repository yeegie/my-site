// Available fields
// ==============
// title: string
// description_short?: string
// description_full?: string
// is_active?: boolean
// ==============

interface IField {
  name: string;
  type: "string" | "number" | "boolean" | "object" | "bigtext";
  optional: boolean;
  default: string | boolean | number
}

interface IWorkCreate {
  fields: Array<IField>;
}

export const WorkCreateDto: IWorkCreate = {
  fields: [
    { name: "title", type: "string", optional: false, default: "Title" },
    { name: "description_short", type: "bigtext", optional: true, default: "Short description" },
    { name: "description_full", type: "bigtext", optional: true, default: "Full description" },
    { name: "is_active", type: "boolean", optional: true, default: false },
  ],
};
