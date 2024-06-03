import { useEffect, useState } from "react";
import styles from "./workList.module.scss";
import { WorkService } from "@shared/api/work/work.service";
import { IWorkResponse } from "@/shared/types";
import { Work } from "@/widgets/work";
import { Button } from "@/shared/ui/Button";

export const WorkListPage: React.FC = () => {
  const [data, setData] = useState<IWorkResponse[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await WorkService.getAll();
        setData(fetchedData);
        console.info("Fethed data:", data);
      } catch (error) {
        console.error("Data fetch error:", error);
      }
    };
    fetchData();
  }, []);

  console.info("Fethed data:", data);

  return (
    <div className={styles.work}>
      <div className={styles['button-holder']}>
        <Button text='Создать' href="/admin/work/create" />
      </div>
      { data
      ? <Work works={data} editMode />
      : <p>Data is null</p> }
    </div>
  );
};
