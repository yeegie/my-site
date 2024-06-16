import { ChangeEvent, useState } from "react";
import styles from "./Input.module.scss";
import { InputProps } from "./Input.props";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import clsx from "clsx";

export const Input: React.FC<InputProps> = ({
  name,
  type,
  minLength,
  maxLength,
  placeholder,
  onChange,
  required,
  className,
  default_value,
}) => {
  const [inputData, setinputData] = useState<string>(default_value ?? "");
  const [visible, setVisible] = useState<boolean>(
    type === "password" ? false : true
  );
  const toggleVisibility = () => setVisible(!visible);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setinputData(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <div className={clsx(styles.input, className)}>
      <input
        type={visible ? "text" : "password"}
        value={inputData}
        placeholder={placeholder}
        name={name}
        minLength={minLength}
        maxLength={maxLength}
        onChange={(event) => handleChange(event)}
        {...(required ? { required } : {})}
      />
      {type === "password" ? (
        <button
          className={styles.eye}
          type="button"
          onClick={() => toggleVisibility()}
        >
          {visible ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
        </button>
      ) : null}
    </div>
  );
};
