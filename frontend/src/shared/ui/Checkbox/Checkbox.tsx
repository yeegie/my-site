import clsx from "clsx";
import styles from "./Checkbox.module.scss";
import { CheckboxProps } from "./Checkbox.props";
import { ChangeEvent, useState } from "react";

export const Checkbox: React.FC<CheckboxProps> = ({
  className,
  text,
  onChange,
  default_value,
}) => {
  const [checked, setChecked] = useState<boolean>(default_value ?? false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(!checked);
    if (onChange) {
      onChange(event)
    }
  };

  return (
    <div className={styles.input}>
      <input
        className={clsx(styles.checkbox, className)}
        type="checkbox"
        checked={checked}
        onChange={(event) => handleChange(event)}
      />
      {text ? <p className={styles.text}>{text}</p> : null}
    </div>
  );
};
