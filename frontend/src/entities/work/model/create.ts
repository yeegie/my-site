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
}

interface IWorkCreate {
  fields: Array<IField>;
}

export const WorkCreateDto: IWorkCreate = {
  fields: [
    { name: "title", type: "string", optional: false },
    { name: "description_short", type: "bigtext", optional: true },
    { name: "description_full", type: "bigtext", optional: true },
    { name: "is_active", type: "boolean", optional: true },
  ],
};
