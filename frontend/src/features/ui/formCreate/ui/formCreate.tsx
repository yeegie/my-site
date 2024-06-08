import React, { FormEvent, useState, ChangeEvent } from "react";
import styles from "./formCreate.module.scss";
import { FormCreateProps } from "./formCreate.props";
import { Button } from "@shared/ui/Button";
import { Input } from "@shared/ui/Input";
import { Checkbox } from "@shared/ui/Checkbox";
import { TextArea } from "@shared/ui/TextField";

type bodyType = {
  [key: string]: string | number | boolean
}

export const FormCreate: React.FC<FormCreateProps> = ({ createDto }) => {
  const [body, setBody] = useState<bodyType>({});

  const handleSubmit = async (e: FormEvent) => {
    console.info('FORM EVENT:', e);  // !!!
  };

  const addToBody = (key: string, value: string | string | boolean) => {
    setBody(prevState => ({
      ...prevState,
      [key]: value,
    }))
    console.info(body)
  }

  const fieldType = {
    "string": <Input />,
    "number": <Input />,
    "boolean": <Checkbox />,
    "object": <TextArea />,
    "bigtext": <TextArea />,
  }

  const fields = createDto.fields.map((field) => (
    <div className={styles.input}>
      <p>{field.name}:</p>
      {React.cloneElement(fieldType[field.type], {
        onChange: (event: ChangeEvent<HTMLInputElement>) => {addToBody(field.name, event.target.value)},
      })}
    </div>
  ));

  return (
    <form className={styles["create-form"]} onSubmit={handleSubmit}>
      <div className={styles.content}>
        {fields ? fields : null}
        <Button text="Создать" />
      </div>
    </form>
  );
};
