import styles from "./sidebar.module.scss";
import { SidebarProps } from "./sidebar.props";
import { MenuCategory } from "@widgets/menuCategory";
import { useAuth } from "@features/hooks/useAuth";

export const Sidebar: React.FC<SidebarProps> = ({ categories }) => {
  const menuCategories =
    categories && categories.length > 0
      ? categories.map((category, index) => (
          <li key={index}>
            <MenuCategory
              key={index}
              title={category.title}
              buttons={category.buttons}
            />
          </li>
        ))
      : null;

  const { user } = useAuth();

  return (
    <div className={styles["side-panel"]}>
      <div className={styles.menu}>
        <div className={styles.username}>{user ? user.username : <p>Error</p>}</div>
        <ul>{menuCategories}</ul>
      </div>
    </div>
  );
};
