import { useState, useEffect } from "react";
import styles from "./home.module.scss";

import { Welcome } from "@widgets/welcome";
import { Work } from "@widgets/work";
import { Title } from "@/shared/ui/Title";

import { WorkService } from "@/shared/api/work/work.service";

import { IWorkResponse } from "@/shared/types/workTypes";

export const HomePage = () => {
  const [data, setData] = useState<IWorkResponse[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await WorkService.getAllAvailable();
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
    <>
      <Welcome />
      <main className={styles.main}>
        <Title anchor="work">Мои проекты 🚀</Title>
        {data ? (
          <div className={styles["work-holder"]}>
            <Work className={styles.work} works={data} />
          </div>
        ) : null}
      </main>
    </>
  );
};
