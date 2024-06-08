import styles from "./TextArea.module.scss";
import { ChangeEvent, useRef, useState } from "react";
import { TextAreaProps } from "./TextArea.props";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import clsx from "clsx";

export const TextArea: React.FC<TextAreaProps> = ({
  className,
  onChange,
}) => {
  const [text, setText] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    console.info(text);
  };

  const insert = (tag: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const { selectionStart, selectionEnd } = textarea;
    const selectedText = text.slice(selectionStart, selectionEnd);

    if (selectedText) {
      const newText = `${text.slice(
        0,
        selectionStart
      )}<${tag}>${selectedText}</${tag}>${text.slice(selectionEnd)}`;
      setText(newText);
    } else {
      const newText = `${text.slice(
        0,
        selectionStart
      )}<${tag}></${tag}>${text.slice(selectionStart)}`;
      setText(newText);
      setTimeout(() => {
        textarea.selectionStart = selectionStart + tag.length + 2;
        textarea.selectionEnd = selectionStart + tag.length + 2;
      }, 0);
    }
  };

  return (
    <div className={clsx(styles["big-text-input"], className)}>
      <div className={styles.controls}>
        <button onClick={() => insert("b")}>Bold</button>
        <button onClick={() => insert("a href='your-link-here'")}>Link</button>
        <button onClick={() => insert("img src='your-image-url-here' alt='description'")}>Image</button>
        <button onClick={() => insert("h1")}>Title</button>
      </div>
      <div className={styles["work-area"]}>
        <textarea
          className={styles.textarea}
          onChange={onChange ?? handleChange}
          // value={text}
          ref={textareaRef}
        />
        {text ? (
          <Markdown
            className={styles.preview}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {text}
          </Markdown>
        ) : null}
      </div>
    </div>
  );
};
