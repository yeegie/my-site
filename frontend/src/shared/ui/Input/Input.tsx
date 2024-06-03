import { ChangeEvent, useEffect, useState } from "react";
import styles from "./Input.module.scss";
import { InputProps } from "./Input.props";

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

export const Input: React.FC<InputProps> = ({
  name,
  type,
  minLength,
  maxLength,
  placeholder,
  onChange,
  required,
}) => {
  const [visible, setVisible] = useState(type === "password" ? false : true);
  const toggleVisibility = () => setVisible(!visible);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles.input}>
      <input
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        {...(name ? { name: { name } } : {})}
        {...(minLength ? { minLength: { minLength } } : {})}
        {...(maxLength ? { maxLength: { minLength } } : {})}
        onChange={handleChange}
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
