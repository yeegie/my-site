import styles from "./menuCategory.module.scss";
import { MenuCategoryProps } from "./menuCategory.props";

import { Title } from "@shared/ui/Title";
import { IconButton } from "@shared/ui/IconButton";
import { IIconButton } from "@shared/types";
import { Link } from "react-router-dom";

export const MenuCategory: React.FC<MenuCategoryProps> = ({
  title,
  buttons,
}) => {
  const buttonsList =
    buttons && buttons.length > 0
      ? buttons.map((button: IIconButton, index: number) => (
          <Link key={index} to={button.href ? button.href : ''}>
            <li className={styles["list-child"]}>
              <IconButton
                icon={button.icon}
                iconColor={button.iconColor}
                text={button.text}
                onClick={button.onClick}
              />
            </li>
          </Link>
        ))
      : null;

  return (
    <div className={styles.list}>
      <Title>{title}</Title>
      <ul>{buttonsList}</ul>
    </div>
  );
};
