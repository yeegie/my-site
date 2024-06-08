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
}) => {
  const [inputData, setinputData] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(
    type === "password" ? false : true
  );
  const toggleVisibility = () => setVisible(!visible);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setinputData(e.target.value);
    console.log(inputData);
  };

  return (
    <div className={clsx(styles.input, className)}>
      <input
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        name={name}
        minLength={minLength}
        maxLength={maxLength}
        onChange={onChange ?? handleChange}
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
