import styles from "./workPreview.module.scss";
import { WorkPreviewProps } from "./workPreview.props";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import { Title } from "@shared/ui/Title";
import { Paragraph } from "@shared/ui/Paragraph";
import { StackTag } from "@/shared/ui/StackTag";
import { LinkButton } from "@/shared/ui/LinkButton";

import { ImageSlider } from "@/widgets/imageSlider";

import clsx from "clsx";

export const WorkPreview: React.FC<WorkPreviewProps> = ({ work }) => {
  const stack_list = work.stack?.map((stack) => (
    <StackTag key={stack.id} title={stack.title} gradient={stack.gradient} />
  ));

  const urls_list = work.url.map((url) => (
    <LinkButton key={url.id} type={url.type} url={url.url} />
  ));

  const image =
    work.image && work.image.length > 0 ? (
      <ImageSlider images={work.image} />
    ) : null;

  return (
    <div
      className={clsx(styles["work-preview"], {
        [styles["preview-body-image"]]: work.image.length > 0,
        [styles["preview-body-text"]]: work.image.length === 0,
      })}
    >
      <div className={styles["work-content"]}>
        <div>
          <div className={styles["text-content"]}>
            <div>
              <Title>{work.title}</Title>
              {image}
              {stack_list.length > 0
              ? <div className={styles["stack-holder"]}>
                  <Paragraph fontSize={"20pt"} bold frozen>
                    Technologies ⚙️
                  </Paragraph>
                  <div className={styles["stack-list"]}>{stack_list}</div>
                </div>
              : null}
              {work.url
              ? <div className={styles["url-holder"]}>{urls_list}</div>
              : null}
              <div className={styles.description}>
                <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                  {work.description_full}
                </Markdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
