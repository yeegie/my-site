import styles from "./workCreate.module.scss";
import { WorkCreateDto } from '@entities/work';
import { FormCreate } from "@features/ui/formCreate";

export const WorkCreatePage: React.FC = () => {
  return (
    <div className={styles.form}>
      <FormCreate createDto={WorkCreateDto}></FormCreate>
    </div>
  );
};
