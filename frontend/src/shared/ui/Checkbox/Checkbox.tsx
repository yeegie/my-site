import clsx from "clsx";
import styles from "./Checkbox.module.scss";
import { CheckboxProps } from "./Checkbox.props";
import { useState } from "react";

export const Checkbox: React.FC<CheckboxProps> = ({
  className,
  text,
  onChange,
}) => {
  const [checked, setChecked] = useState<boolean>(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <div className={styles.input}>
      <input
        className={clsx(styles.checkbox, className)}
        type="checkbox"
        // checked={checked}
        onChange={onChange ?? handleChange}
      />
      {text ? <p className={styles.text}>{text}</p> : null}
    </div>
  );
};
