import styles from "./workCreate.module.scss";
import { FormCreate } from "@features/ui/formCreate";
import { availableCreateTables } from "@app/data/availableTables";

export const WorkCreatePage: React.FC = () => {
  return (
    <div className={styles.form}>
      <FormCreate createDto={availableCreateTables.WorkCreateDto}></FormCreate>
    </div>
  );
};
