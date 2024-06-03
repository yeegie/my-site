import { FormEvent, useState } from "react";
import styles from "./formCreate.module.scss";
import { FormCreateProps } from "./formCreate.props";
import { Button } from "@shared/ui/Button";
import { Input } from "@shared/ui/Input";
import { availableCreateTables } from "@/app/data/availableTables";

type bodyType = {
  [key: string]: string | number | boolean
}

export const FormCreate: React.FC<FormCreateProps> = ({ createDto }) => {
  const [body, setBody] = useState<bodyType>({});

  const handleSubmit = async (e: FormEvent) => {};

  const addToBody = (key: string, value: string | string | boolean) => {
    setBody(prevState => ({
      ...prevState,
      [key]: value,
    }))
    console.info(body)
  }

  return (
    <form className={styles["create-form"]} onSubmit={handleSubmit}>
      <div className={styles.content}>
        {console.info()}
        <Button text="Создать" />
      </div>
    </form>
  );
};

/* {Object.keys(createDto).map((item, index) => (
          <div key={index} className={styles.row}>
            <label>
              {item}:
              {typeof createDto[item] === 'boolean'
              ? <input type='checkbox' onChange={(event) => addToBody(item, event.target.checked)}></input>
              : <Input onChange={(value) => addToBody(item, value)} />} 
            </label>
          </div>
        ))} */
