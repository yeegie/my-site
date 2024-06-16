import { Input } from "@shared/ui/Input";
import { Checkbox } from "@shared/ui/Checkbox";
import { TextArea } from "@shared/ui/TextArea";

export const fieldType = {
  string: <Input />,
  number: <Input />,
  boolean: <Checkbox />,
  object: <TextArea />,
  bigtext: <TextArea />,
};
