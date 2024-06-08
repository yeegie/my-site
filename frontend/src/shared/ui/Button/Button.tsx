import { Link } from "react-router-dom";
import styles from "./Button.module.scss";
import { ButtonProps } from "./Button.props";

export const Button: React.FC<ButtonProps> = ({
  type,
  text,
  href,
  disabled,
}) => {
  const buttonComponent = <button
      type={type}
      disabled={disabled}
      className={styles.button}
    >
      {text}
    </button>

  return href
    ? <Link to={href}>{buttonComponent}</Link>
    : buttonComponent;
};
