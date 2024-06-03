import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import styles from "./ui.module.scss";

import { Title } from "@/shared/ui/Title";

import { Work } from "@widgets/work";
import { WorkPreview } from "@widgets/workPreview";

import { WorkService } from "@shared/api/work/work.service";
import { IWorkResponse } from "@shared/types/workTypes";

export const WorkPreviewPage = () => {
  const { id } = useParams();
  const [data, setData] = useState<IWorkResponse[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      try {
        const fetchedData = await WorkService.getAllAvailable();
        setData(fetchedData);
      } catch (error) {
        setError("Data fetching error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return null;
  }

  const current_work = data.find((x) => x.id === Number(id));
  const other_works = data.filter((item) => item.id !== current_work?.id);

  return (
    <>
      <main>
        <div className={styles["content-holder"]}>
          {current_work && <WorkPreview work={current_work} />}
          <Title>Другие кейсы</Title>
          {data ? (
            <div className={styles["work-holder"]}>
              <Work className={styles.work} works={other_works} />
            </div>
          ) : null}
        </div>
      </main>
    </>
  );
};
