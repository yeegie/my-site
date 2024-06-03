// Available fields
// ==============
// title?: string
// description_short?: string
// description_full?: string
// is_active?: boolean
// ==============

interface IField {
  name: string;
  type: "string" | "number" | "boolean" | "object" | "bigtext";
  optional: boolean;
}

interface IWorkPatch {
  fields: Array<IField>;
}

export const WorkPatchDto: IWorkPatch = {
  fields: [
    { name: "title", type: "string", optional: true },
    { name: "description_short", type: "bigtext", optional: true },
    { name: "description_full", type: "bigtext", optional: true },
    { name: "is_active", type: "boolean", optional: true },
  ],
};
